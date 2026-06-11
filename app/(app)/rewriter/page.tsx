"use client";

import React, { useState } from 'react';
import { rewriteApi } from '@/app/_lib/api';
import { BioRewriteResponse } from '@/app/_lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw } from 'lucide-react';

type Region = 'Indian English' | 'Philippine English' | 'Brazilian Portuguese English';
type Tone = 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';

export default function RewriterPage() {
  const [input, setInput] = useState('');
  const [region, setRegion] = useState<Region>('Indian English');
  const [tone, setTone] = useState<Tone>('Warm & Playful');
  const [result, setResult] = useState<BioRewriteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = async () => {
    if (!input.trim()) {
      setError('Please enter a bio to rewrite.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await rewriteApi.bio({ input_text: input, region, tone });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rewrite failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Bio Rewriter</h1>
        <p className="mt-2 text-gray-600">Paste your bio and let us make it sound naturally fluent.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Bio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bio-input">Your Current Bio</Label>
            <Textarea
              id="bio-input"
              placeholder="Paste your dating profile bio here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="mt-2 resize-none"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="region-select">Your Regional English</Label>
              <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
                <SelectTrigger id="region-select" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indian English">Indian English</SelectItem>
                  <SelectItem value="Philippine English">Philippine English</SelectItem>
                  <SelectItem value="Brazilian Portuguese English">Brazilian Portuguese English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tone-select">Tone Preference</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <SelectTrigger id="tone-select" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Warm & Playful">Warm & Playful</SelectItem>
                  <SelectItem value="Confident & Direct">Confident & Direct</SelectItem>
                  <SelectItem value="Thoughtful & Genuine">Thoughtful & Genuine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button
            onClick={handleRewrite}
            disabled={loading || !input.trim()}
            className="w-full"
          >
            {loading ? 'Rewriting...' : 'Rewrite Bio'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Rewritten Bio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Rewritten Text</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(result.output_text)}
                >
                  <Copy size={16} className="mr-2" /> Copy
                </Button>
              </div>
              <p className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900">
                {result.output_text}
              </p>
              {result.branding && (
                <p className="mt-2 text-xs text-gray-500">Powered by MatchTone</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Why This Rewrite?</h3>
              <p className="mt-2 text-sm text-gray-700">{result.explanation}</p>
            </div>

            {result.variant_b && (
              <div>
                <h3 className="font-semibold text-gray-900">Alternative Variant</h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900">
                      {result.variant_b}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result.variant_b!)}
                    className="ml-2"
                  >
                    <Copy size={16} /> Copy
                  </Button>
                </div>
              </div>
            )}

            <Button
              onClick={handleRewrite}
              variant="outline"
              className="w-full"
            >
              <RotateCcw size={16} className="mr-2" /> Regenerate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}