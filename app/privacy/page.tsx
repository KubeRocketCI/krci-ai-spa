import { Metadata } from 'next';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | KubeRocketAI',
  description: 'Learn how KubeRocketAI collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy | KubeRocketAI',
    description: 'Learn how KubeRocketAI collects, uses, and protects your personal information.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-300">
      <SharedHeader />

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Privacy Policy</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-center text-gray-400 mb-8">
            <strong>Effective Date:</strong> August 29, 2025
            <br />
            <strong>Last Updated:</strong> August 29, 2025
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded mb-8">
            <h2 className="font-semibold text-blue-400 mb-2">Project Notice</h2>
            <p>
              KubeRocketAI is developed by KubeRocketCI team members in their spare time as an
              open-source initiative. This is NOT a commercial service - we're building open-source
              tools for the AI-as-Code community! We collect only essential data and prioritize
              privacy as fellow developers who understand data protection concerns.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes our policies and procedures on the collection, use and
              disclosure of your information when you use our open-source project and tells you
              about your privacy rights and how the law protects you.
            </p>
            <p className="mt-3">
              We use your personal data to provide and improve our open-source initiative. By using
              the Service, you agree to the collection and use of information in accordance with
              this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">
              2.1 What We Actually Collect (Open Source Project Reality)
            </h3>
            <p className="mb-3">As an open-source initiative, we collect minimal data:</p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">Personal Data</h3>
            <p className="mb-3">
              When using our Service, we may ask you to provide certain personally identifiable
              information for specific purposes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Email address (for newsletter, early adopter program)</li>
              <li>Name (for early adopter program, community participation)</li>
              <li>Company/organization (optional, for early adopter program context)</li>
              <li>Use case description (for early adopter program)</li>
              <li>GitHub username (for community participation)</li>
            </ul>

            <div className="bg-slate-800/50 border border-slate-600/30 p-3 rounded mb-4">
              <p className="text-gray-300 font-medium text-sm">
                We do NOT collect: Payment information (this is a free project), sensitive personal
                data, or more data than necessary for our simple purposes.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">Usage Data</h3>
            <p className="mb-3">
              Usage Data is collected automatically when using the Service through Google Analytics
              4:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Your Device's Internet Protocol address (IP address, anonymized by Google)</li>
              <li>Browser type and version</li>
              <li>Pages of our Service that you visit</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Unique device identifiers and other diagnostic data</li>
              <li>Referring website information</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">Cookies and Tracking</h3>
            <p className="mb-3">
              We use Cookies and similar tracking technologies with your consent through our cookie
              consent system:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Necessary Cookies:</strong> Essential for website functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Google Analytics tracking (with consent only)
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember your preferences
              </li>
              <li>
                <strong>Cookie Consent Cookies:</strong> Remember your consent choices
              </li>
            </ul>
            <p className="text-cyan-400 text-sm mt-2">
              You can manage your cookie preferences using our cookie consent tool available on
              every page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              3. How We Use Your Personal Data
            </h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.1 Website Improvement</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Provide and maintain our Service</li>
              <li>Monitor usage to improve user experience</li>
              <li>Analyze which content is most helpful</li>
              <li>Fix bugs and optimize performance</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.2 Community Building</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Manage early adopter program participation</li>
              <li>Send updates about the project (with consent)</li>
              <li>Respond to your questions and feedback</li>
              <li>Facilitate community discussions</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.3 Communication</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Send newsletter updates (opt-in only)</li>
              <li>Notify early adopters about platform integration</li>
              <li>Respond to support requests and questions</li>
              <li>Share important project announcements</li>
            </ul>

            <div className="bg-slate-800/50 border border-slate-600/30 p-3 rounded mb-4">
              <h4 className="text-gray-200 font-medium">We do NOT use your data for:</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1">
                <li>Commercial advertising or marketing</li>
                <li>Selling, renting, or trading to third parties</li>
                <li>Profit generation (this is an open-source initiative)</li>
                <li>Building user profiles for commercial purposes</li>
                <li>Any tracking beyond basic website analytics</li>
                <li>Any purposes beyond improving our open source project</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Information Sharing</h2>

            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded mb-4">
              <p className="text-blue-400 font-medium">
                ✅ We do NOT sell your personal information to anyone.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">4.1 Service Providers</h3>
            <p className="mb-3">
              We share information with trusted service providers who help us operate:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Google Analytics: Website analytics (with your consent)</li>
              <li>Vercel: Website hosting and performance</li>
              <li>GitHub: Code repository and community features</li>
              <li>Email Service: Newsletter delivery (if you subscribe)</li>
              <li>Telegram: Community chat platform</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">4.2 Legal Requirements</h3>
            <p className="mb-4">
              We may disclose information if required by law or to protect rights and safety.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">4.3 Community Participation</h3>
            <p>
              When you participate in public areas (GitHub discussions, public feedback), that
              information may be viewed by the community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Data Security & Retention</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.1 Security Measures</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure hosting on Vercel with industry-standard protections</li>
              <li>Access controls and authentication for admin systems</li>
              <li>Regular security updates and monitoring</li>
              <li>Data minimization - we only collect what we need</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.2 Data Retention</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Usage Data (Google Analytics): 26 months (Google's default)</li>
              <li>Email Addresses: Until you unsubscribe or request deletion</li>
              <li>Early Adopter Information: 2 years or until program completion</li>
              <li>Community Contributions: As long as relevant to the project</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.3 International Transfers</h3>
            <p>
              Your information may be processed in countries outside Ukraine, including United
              States (Google Analytics, GitHub, Vercel servers) and European Union. We ensure
              appropriate safeguards including Google's EU-US Data Privacy Framework compliance and
              standard contractual clauses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights & Choices</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.1 Cookie Management</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Change your cookie preferences anytime using our cookie consent tool</li>
              <li>Opt out of analytics cookies while keeping functionality cookies</li>
              <li>Clear your browser cookies to reset all preferences</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.2 Your Control Over Data</h3>
            <p className="mb-3">
              Since we don't store personal data on our servers, your data control is
              straightforward:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                <strong>Cookie Settings:</strong> Use our cookie consent tool to control analytics
                tracking
              </li>
              <li>
                <strong>Google Analytics:</strong> Your analytics data is managed by Google -
                control it through your Google Account settings
              </li>
              <li>
                <strong>Email Communications:</strong> Unsubscribe from any emails using the link
                provided in each message
              </li>
              <li>
                <strong>Third-Party Platforms:</strong> For GitHub, Telegram, or other platforms -
                contact them directly to manage your data
              </li>
              {/* <li>
                <strong>Questions:</strong> Contact us at support@kuberocketci.io for any
                privacy-related questions
              </li> */}
            </ul>

            <div className="bg-slate-800/50 border border-slate-600/30 p-3 rounded">
              <p className="text-gray-300 text-sm">
                <strong>Simple Truth:</strong> We don't store your personal data on our servers.
                Third-party services (Google Analytics, GitHub, Telegram) manage their own data
                according to their privacy policies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Contact Us</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">7.1 Privacy Requests</h3>
            <p className="mb-3">
              For questions about this policy or to exercise your privacy rights, contact us:
            </p>
            <div className="bg-slate-800 p-4 rounded mb-4">
              <p>
                {/* <strong>Email:</strong> support@kuberocketci.io
                <br /> */}
                <strong>GitHub:</strong> Open an issue in our repository
                <br />
                <strong>Telegram:</strong> Join our community channel
                <br />
                <strong>Website:</strong> krci-ai.kuberocketci.io
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">7.2 Policy Updates</h3>
            <p className="mb-3">We may update this privacy policy from time to time. When we do:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>We'll post the updated policy on this page</li>
              <li>We'll update the "Last Updated" date at the top</li>
              <li>For significant changes, we'll notify through community channels</li>
              <li>Your continued use constitutes acceptance of the updated policy</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">7.3 Accessibility</h3>
            <p className="mb-4">
              We strive to make our website accessible to all users, including those with
              disabilities. If you encounter any accessibility barriers while using our Service,
              please contact us so we can work to address them.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">7.4 Contact Response Times</h3>
            <p className="mb-4">
              As an open-source project maintained by volunteers, we aim to respond to privacy
              requests within 30 days, but response times may vary depending on current
              circumstances and volunteer availability.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">7.5 Open Source Commitment</h3>
            <p>
              As an open-source project from Ukraine, we believe in transparency and global
              developer collaboration. Our privacy practices align with our commitment to open
              development, minimal data collection, and respect for fellow developers' privacy
              worldwide.
            </p>
          </section>

          <div className="border-t border-gray-700 pt-6 mt-8 text-center text-gray-400 text-xs">
            <p>This privacy policy was last updated on August 29, 2025.</p>
            <p className="mt-2 text-yellow-400">
              🇺🇦 Ukrainian open-source project supporting global AI-as-Code collaboration
            </p>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}
