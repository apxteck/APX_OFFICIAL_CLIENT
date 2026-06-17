'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { publicPaymentService } from '@/services/public/payment.service';
import { toast } from 'react-hot-toast';
import { useRazorpay } from 'react-razorpay';
import { Loader2, CheckCircle, AlertCircle, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const { orderId } = useParams();
  const { Razorpay } = useRazorpay();
  const [isProcessing, setIsProcessing] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

  // Parse orderId correctly if it's an array or string
  const validOrderId = Array.isArray(orderId) ? orderId[0] : orderId;

  const {
    data: payment,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['payment', validOrderId],
    queryFn: () => publicPaymentService.getPaymentByOrderId(validOrderId!),
    enabled: !!validOrderId,
    retry: 1,
  });

  // Extract pure Razorpay order ID (e.g. backend sets orderId in paymentLink like /payment/order_abc123)
  // Actually, validOrderId is what we use to fetch the payment. It might literally be the razorpay order ID.
  const rzpOrderId = validOrderId; 

  const handlePayment = () => {
    if (!payment || !rzpOrderId) {
      toast.error('Payment details not available');
      return;
    }

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_T0yqvDRsvH5arl';

    const options = {
      key: razorpayKey,
      amount: Math.round(payment.negotiatedAmount * 100), // Amount in paise
      currency: 'INR' as any,
      name: 'APX Teck',
      description: `Payment for ${payment.service?.name || 'Service'}`,
      image: '/logo.png', // Fallback to APX Teck logo if available
      order_id: rzpOrderId, // The Razorpay Order ID passed in URL
      handler: function (response: any) {
        setIsProcessing(true);
        toast.success('Payment successful! Verifying...', { duration: 4000 });
        
        publicPaymentService.verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }).then(() => {
          setJustPaid(true);
          refetch().then(() => setIsProcessing(false));
        }).catch(() => {
          // Fallback to refetch, maybe webhook processed it
          setJustPaid(true);
          refetch().then(() => setIsProcessing(false));
        });
      },
      prefill: {
        name: payment.customer?.fullName || '',
        email: payment.customer?.email || '',
        contact: payment.customer?.phone || '',
      },
      theme: {
        color: '#6366f1', // Indigo-500
      },
    };

    try {
      const rzp1 = new Razorpay(options);
      
      rzp1.on('payment.failed', function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      
      rzp1.open();
    } catch (error) {
      console.error('Razorpay initialization failed', error);
      toast.error('Could not initialize payment gateway.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading secure checkout...</p>
        </div>
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-100 dark:border-red-900/30"
        >
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Link Invalid or Expired</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We couldn't find a valid payment request for this link. It might have been altered or expired.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const isPaid = payment.status === 'PAID';
  const isCancelled = payment.status === 'CANCELLED';

  return (
    <div className="min-h-screen bg-[url('/grid-bg.svg')] bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-transparent pointer-events-none blur-3xl"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50 dark:opacity-30 mix-blend-multiply"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 dark:opacity-30 mix-blend-multiply"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[520px] relative z-10"
      >
        <div className="bg-white dark:bg-[#12121a] rounded-[2rem] shadow-2xl dark:shadow-indigo-900/10 border border-gray-100 dark:border-gray-800/60 overflow-hidden backdrop-blur-xl">
          
          {/* Header Area */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            
            <AnimatePresence mode="wait">
              {isPaid ? (
                <motion.div 
                  key="paid-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 ring-2 ring-white/50">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Payment Successful</h1>
                </motion.div>
              ) : isCancelled ? (
                <motion.div 
                  key="cancelled-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 ring-2 ring-white/50">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Payment Cancelled</h1>
                </motion.div>
              ) : (
                <motion.div 
                  key="pending-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  <h1 className="text-2xl font-bold text-white tracking-tight">Complete Your Payment</h1>
                  <p className="text-indigo-100 mt-2 font-medium">Secure Checkout via Razorpay</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8">
            <div className="mb-6 space-y-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Hello {payment.customer?.fullName?.split(' ')[0]},
              </h2>
              {!isPaid && !isCancelled && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Congratulations on taking the next step with APX! We are thrilled to be working with you on <strong className="text-gray-800 dark:text-gray-200">{payment.service?.name}</strong>. Please review the details below.
                </p>
              )}
              {isPaid && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Thank you for your payment! We have successfully received it and our team is already on it.
                </p>
              )}
            </div>

            {/* Invoice Details Card */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 mb-6 relative group hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800 border-dashed">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">{payment.service?.name}</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800 border-dashed">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Request ID</span>
                <span className="text-sm font-mono font-medium text-gray-900 dark:text-white bg-gray-200/50 dark:bg-gray-800 px-2 py-0.5 rounded">#{payment.serviceRequestId}</span>
              </div>

              {isPaid && payment.transactionId && (
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800 border-dashed">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</span>
                  <span className="text-sm font-mono font-medium text-green-600 dark:text-green-400">{payment.transactionId}</span>
                </div>
              )}

              <div className="flex justify-between items-end pt-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{isPaid ? 'Amount Paid' : 'Amount Payable'}</span>
                <div className="text-right">
                  {payment.suggestedAmount && payment.suggestedAmount > payment.negotiatedAmount && !isPaid && (
                    <span className="text-sm text-gray-400 line-through mr-2">
                      ₹{payment.suggestedAmount}
                    </span>
                  )}
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    ₹{payment.negotiatedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Note Section */}
            {payment.invoiceNote && !isPaid && (
              <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 mb-8">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Note from APX</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{payment.invoiceNote}"</p>
              </div>
            )}

            {/* Action Area */}
            <div className="mt-8">
              {!isPaid && !isCancelled ? (
                <div className="space-y-4">
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="group relative w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 shadow-xl shadow-gray-900/10 dark:shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>Pay Securely Now</span>
                        <ChevronRight className="w-5 h-5 absolute right-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Payments are secure and encrypted
                  </p>
                </div>
              ) : justPaid ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-8 text-center mt-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Payment Successful!</h3>
                  <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                    Thank you! We have successfully received your payment. Our team will start working on it shortly.
                  </p>
                </div>
              ) : isPaid ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-8 text-center mt-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Payment Already Completed!</h3>
                  <p className="text-green-700 dark:text-green-400 font-medium text-sm">
                    This request was successfully paid on {new Date(payment.paidAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 text-center">
                  <p className="text-red-700 dark:text-red-400 font-medium text-sm">
                    This payment link has been cancelled. Please contact support if you need assistance.
                  </p>
                </div>
              )}
            </div>

          </div>
          
          <div className="bg-gray-50 dark:bg-[#15151e] p-4 text-center border-t border-gray-100 dark:border-gray-800/60">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} APX Teck. All rights reserved.<br/>
              If you have any questions, please <a href="mailto:support@apxteck.com" className="text-indigo-500 hover:underline">contact our support team</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
