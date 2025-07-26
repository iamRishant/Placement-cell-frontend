import React, { useState, useRef } from 'react';

export default function VerifyEmail({ onDone }) {
  const [step, setStep]         = useState('email'); 
  // 'email' | 'code' | 'done'
  const [email, setEmail]       = useState('');
  const [sending, setSending]   = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError]       = useState('');
  const [otp, setOtp]           = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  // STEP 1: send the OTP
  const sendOtp = async () => {
    setError('');
    if (!email.endsWith('@cuchd.in')) {
      setError('Please enter a valid @cuchd.in email.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/user/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Failed to send OTP');
      setStep('code');
      // autofocus first box
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  // handle typing into the 6 boxes
  const handleOtpChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const arr = [...otp];
    arr[idx] = val;
    setOtp(arr);
    if (val && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    } else if (!val && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  // STEP 2: verify the OTP
  const verifyOtp = async () => {
    setError('');
    const code = otp.join('');
    if (code.length < 6) {
      setError('Enter all 6 digits');
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Verification failed');
      setStep('done');
      onDone?.();   // notify parent that we’re finished
    } catch (e) {
      setError(e.message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="p-6 border rounded max-w-sm mx-auto space-y-4">
      {step === 'email' && (
        <>
          <h3 className="text-lg font-medium">Verify your CUCHD Email</h3>
          <input
            type="email"
            placeholder="uid@cuchd.in"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={sending}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={sendOtp}
            disabled={sending}
            className={`w-full p-2 text-white rounded ${
              sending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {sending ? 'Sending…' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 'code' && (
        <>
          <h3 className="text-lg font-medium">
            Enter the 6-digit code we sent to {email}
          </h3>
          <div className="flex justify-center space-x-2">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={el => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleOtpChange(i, e.target.value)}
                className="w-10 h-10 text-center border rounded"
                disabled={verifying}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={verifyOtp}
              disabled={verifying}
              className={`px-4 py-2 text-white rounded ${
                verifying ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {verifying ? 'Verifying…' : 'Verify'}
            </button>
            <button
              onClick={sendOtp}
              disabled={sending}
              className={`px-4 py-2 text-white rounded ${
                sending ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              {sending ? 'Resending…' : 'Resend'}
            </button>
          </div>
        </>
      )}

      {step === 'done' && (
        <div className="text-center">
          <h3 className="text-green-600 font-semibold">✔ Email Verified!</h3>
          <p className="mt-2">You can now go ahead and sign up.</p>
        </div>
      )}
    </div>
  );
}