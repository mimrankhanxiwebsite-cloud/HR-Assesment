import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function MFASetup() {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [factorId, setFactorId] = useState<string | null>(null)

  useEffect(() => {
    // Generate TOTP secret and QR code on mount
    async function setupMFA() {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      })
      if (error) {
        setError(error.message)
      } else if (data) {
        setFactorId(data.id)
        setQrCode(data.totp.qr_code)
        setSecret(data.totp.secret)
      }
    }
    setupMFA()
  }, [])

  const handleVerify = async () => {
    if (!factorId) return
    setError(null)
    const { data, error } = await supabase.auth.mfa.challenge({ factorId })
    if (error) {
      setError(error.message)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: data.id,
      code,
    })

    if (verifyError) {
      setError(verifyError.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
      <Card className="w-full max-w-md shadow-brand-lg">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Secure your account with MFA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {success ? (
            <div className="text-emerald-600 font-medium">MFA Successfully Enabled!</div>
          ) : (
            <>
              {qrCode && (
                <div className="flex justify-center mb-4">
                  <img src={qrCode} alt="QR Code" className="w-48 h-48 border" />
                </div>
              )}
              {secret && (
                <p className="text-sm font-mono bg-muted p-2 rounded">
                  Secret: {secret}
                </p>
              )}
              <div className="space-y-2 mt-4 text-left">
                <label className="text-sm font-medium">Enter 6-digit code</label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </>
          )}
        </CardContent>
        <CardFooter>
          {!success && (
            <Button onClick={handleVerify} className="w-full">
              Verify Code
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
