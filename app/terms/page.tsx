import { Metadata } from 'next';
import { SharedHeader } from '@/components/shared-header';
import { SharedFooter } from '@/components/shared-footer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | KubeRocketAI',
  description: 'Terms and conditions for using KubeRocketAI framework and website.',
  openGraph: {
    title: 'Terms & Conditions | KubeRocketAI',
    description: 'Terms and conditions for using KubeRocketAI framework and website.',
    type: 'website',
  },
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Terms & Conditions</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-center text-gray-400 mb-8">
            <strong>Effective Date:</strong> August 29, 2025
            <br />
            <strong>Last Updated:</strong> August 29, 2025
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded mb-8">
            <h2 className="font-semibold text-blue-400 mb-2">🚀 Project Notice</h2>
            <p>
              KubeRocketAI is developed by KubeRocketCI team members in their spare time as an
              open-source initiative. This is open-source software provided &quot;AS IS&quot; with
              NO commercial backing, warranties, or formal support. We&apos;re sharing our
              AI-as-Code tools with the developer community as an open-source contribution!
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              Please read these terms and conditions carefully before using our open-source project.
            </p>
            <p className="mb-4">
              By accessing our website, downloading KubeRocketAI framework, or using our services,
              you agree to be bound by these Terms & Conditions. If you disagree with any part of
              these terms, you may not use our services.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">1.1 Scope of Terms</h3>
            <p className="mb-3">These terms apply to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                <strong>Website Usage:</strong> krci-ai.kuberocketci.io and all subdomains
              </li>
              <li>
                <strong>Online Services:</strong> Early adopter program, newsletters, community
                features
              </li>
              <li>
                <strong>Content:</strong> Documentation, tutorials, marketing materials
              </li>
              <li>
                <strong>Community Participation:</strong> GitHub discussions, Telegram, feedback
              </li>
            </ul>
            <p className="text-cyan-400 text-sm mb-4">
              <strong>Note:</strong> KubeRocketAI framework software is governed by its Apache 2.0
              license.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">1.2 Updates to Terms</h3>
            <p>
              We may revise these terms from time to time. The most current version will always be
              posted on this page. For significant changes, we&apos;ll notify users via email or
              website banner. Continued use after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              2. KubeRocketAI Framework Usage
            </h2>

            <div className="bg-slate-800/50 border border-slate-600/30 p-4 rounded mb-4">
              <h3 className="text-gray-200 font-medium">
                CRITICAL: OPEN SOURCE PROJECT DISCLAIMERS
              </h3>
              <div className="text-gray-300 text-sm mt-2 space-y-2">
                <p>
                  <strong>No Commercial Support:</strong> This is an open-source project maintained
                  by KubeRocketCI team members on a volunteer basis. We provide NO warranties,
                  guarantees, commercial support, or Service Level Agreements (SLAs) of any kind.
                  Use entirely at your own risk.
                </p>
                <p>
                  <strong>Volunteer Basis & No Obligations:</strong> ALL work on this project is
                  done voluntarily. There are ZERO obligations for continued development, bug fixes,
                  user support, backward compatibility, or response to issues.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">
              2.1 Apache 2.0 License Rights
            </h3>
            <p className="mb-3">
              The KubeRocketAI framework is released under Apache 2.0 License in a separate
              repository. Under the Apache 2.0 License, you may:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Use the software for any purpose, including commercial use</li>
              <li>Modify, distribute, and sublicense the software</li>
              <li>Include the software in proprietary products</li>
              <li>Sell products that include the software</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">2.2 Framework Disclaimers</h3>
            <p className="mb-3 uppercase font-semibold">
              THE FRAMEWORK SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">2.3 User Responsibilities</h3>
            <p className="mb-3">When using the KubeRocketAI framework, you are responsible for:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Testing thoroughly before any production deployment</li>
              <li>Implementing appropriate security measures</li>
              <li>Backing up your data and configurations</li>
              <li>Compliance with applicable laws and regulations</li>
              <li>Monitoring for security vulnerabilities</li>
              <li>Properly attributing the software per Apache 2.0 license requirements</li>
              <li>Following Apache 2.0 notice and attribution requirements</li>
              <li>Benefiting from explicit patent grant protections</li>
            </ul>

            <div className="bg-slate-800/50 border border-slate-600/30 p-4 rounded">
              <h4 className="text-gray-200 font-medium">PRODUCTION USE WARNING</h4>
              <p className="text-gray-300 text-sm mt-2">
                CRITICAL: If you deploy KubeRocketAI in production environments, you do so ENTIRELY
                at your own risk with ZERO support from maintainers. Before ANY production use, you
                MUST conduct thorough testing, perform security audits, implement backup procedures,
                have internal expertise, and accept full responsibility for failures.
              </p>
              <p className="text-gray-300 text-sm mt-2 font-medium">
                We STRONGLY DISCOURAGE production use without proper enterprise support
                infrastructure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Website Usage Guidelines</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.1 Acceptable Use</h3>
            <p className="mb-3">
              You may use our website and services for legitimate purposes. You agree to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Provide accurate information in forms and applications</li>
              <li>Respect other users and community members</li>
              <li>Follow GitHub community guidelines when participating in discussions</li>
              <li>Use our resources for learning and legitimate business purposes</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.2 Prohibited Activities</h3>
            <p className="mb-3">You may NOT:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit malicious code, viruses, or harmful software</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Spam our contact forms or community channels</li>
              <li>Scrape our website content for unauthorized purposes</li>
              <li>Violate intellectual property rights</li>
              <li>Impersonate KubeRocketAI team members or affiliates</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">3.3 Content Guidelines</h3>
            <p>
              When submitting content (feedback, discussions, bug reports), you grant us a
              non-exclusive license to use, modify, and display that content for improving our
              services. We reserve the right to remove content that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              4. Disclaimers & Limitation of Liability
            </h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">4.1 Service Disclaimers</h3>
            <p className="mb-3 uppercase font-semibold">IMPORTANT: READ CAREFULLY</p>
            <p className="mb-3">
              Our website and services are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              without warranties of any kind, either express or implied, including:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Merchantability, fitness for particular purpose, or non-infringement</li>
              <li>Accuracy, completeness, or usefulness of information</li>
              <li>Uninterrupted, timely, secure, or error-free service</li>
              <li>Results from use of our services or software</li>
              <li>Correction of defects or errors</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">4.2 Limitation of Liability</h3>
            <p className="mb-3 uppercase font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                We shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages
              </li>
              <li>
                This includes damages for loss of profits, data, use, goodwill, or other intangible
                losses
              </li>
              <li>
                These limitations apply whether based on warranty, contract, tort, or any other
                legal theory
              </li>
              <li>
                These limitations apply even if we&apos;ve been advised of the possibility of such
                damages
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              5. KubeRocketCI Platform Integration
            </h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.1 Platform Relationship</h3>
            <p className="mb-4">
              KubeRocketAI framework is designed to integrate with the KubeRocketCI platform. The
              framework serves as a foundation for platform adoption but is a separate project with
              different terms.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.2 Early Adopter Program</h3>
            <p className="mb-3">Our early adopter program provides:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Early access to KubeRocketCI platform features</li>
              <li>Opportunities to provide feedback and influence roadmap</li>
              <li>Research participation and testing opportunities</li>
              <li>No guarantee of continued access or specific features</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-200 mb-2">5.3 Separate Platform Terms</h3>
            <p>
              The KubeRocketCI platform save separate terms of service, pricing, and policies. These
              terms do not grant access to paid platform features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              6. Additional Legal Provisions
            </h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.1 Age Restrictions</h3>
            <p className="mb-4">
              You must be at least 13 years old to use this Service. If you are under 18, you
              represent that you have your parent&apos;s or guardian&apos;s permission to use the
              Service.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.2 Indemnification</h3>
            <p className="mb-4">
              You agree to indemnify and hold harmless the KubeRocketCI team, contributors, and
              maintainers from and against any claims, damages, obligations, losses, liabilities,
              costs, or debt arising from: (i) your use of the Service; (ii) your violation of these
              Terms; (iii) your violation of any third party right; or (iv) any claim that your use
              caused damage to a third party.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.3 Force Majeure</h3>
            <p className="mb-4">
              Neither party will be liable for any failure or delay in performance under these Terms
              which is due to fire, flood, earthquake, elements of nature, acts of God, acts of war,
              terrorism, riots, civil disorders, rebellions, or other similar causes beyond the
              reasonable control of such party. This is particularly relevant given the current
              extraordinary circumstances affecting Ukraine.
            </p>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.4 Data Backup and Loss</h3>
            <p className="mb-4">
              You are solely responsible for backing up any data, configurations, or content you
              create using our framework. We are not responsible for any data loss, corruption, or
              deletion that may occur through your use of the Service or framework.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Governing Law</h2>

            <p className="mb-4">
              The laws of Ukraine, excluding its conflicts of law rules, shall govern these Terms
              and Your use of the Service. Your use of the Service may also be subject to other
              local, state, national, or international laws.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded mb-4">
              <h4 className="text-blue-400 font-medium">Ukrainian Jurisdiction Notes:</h4>
              <ul className="list-disc list-inside text-blue-300 text-sm mt-2 space-y-1">
                <li>Ukrainian civil and commercial law applies</li>
                <li>Consumer protection under Ukrainian law where applicable</li>
                <li>
                  Compliance efforts with EU-aligned standards as part of Ukraine&apos;s European
                  integration
                </li>
                <li>
                  Given current circumstances, reasonable accommodations may apply for legal
                  processes
                </li>
              </ul>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">6.1 Disputes Resolution</h3>
            <p>
              If You have any concern or dispute about the Service, You agree to first try to
              resolve the dispute informally by contacting us through our community channels (GitHub
              issues, Telegram, or email). Given the open-source nature of this project and current
              Ukrainian circumstances, we&apos;ll make reasonable efforts to address concerns
              through community channels, but formal dispute resolution processes may be limited. We
              prioritize community-based resolution of issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Contact & Questions</h2>

            <h3 className="text-lg font-medium text-gray-200 mb-2">
              8.1 Questions About This Project?
            </h3>
            <p className="mb-3">For questions about these terms or our project:</p>
            <div className="bg-slate-800 p-4 rounded mb-4">
              <p>
                <strong>GitHub:</strong> Open an issue in our repository
                <br />
                <strong>Telegram:</strong> Chat with us in our community channel
                <br />
                <strong>Website:</strong> krci-ai.kuberocketci.io
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-200 mb-2">8.2 Technical Support</h3>
            <p>
              For technical questions about the framework, please use our GitHub Issues or community
              channels.
              <strong>
                Remember: This is an open-source project with no formal support obligations!
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Risk Assessment for Users</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/30 border border-slate-600/30 p-4 rounded">
                <h4 className="text-gray-200 font-medium mb-2">LOW RISK:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Learning and development</li>
                  <li>• Testing environments</li>
                  <li>• Community participation</li>
                  <li>• Following open source practices</li>
                </ul>
              </div>

              <div className="bg-slate-800/30 border border-slate-600/30 p-4 rounded">
                <h4 className="text-gray-200 font-medium mb-2">MEDIUM RISK:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Internal/staging environments</li>
                  <li>• Commercial development (with testing)</li>
                  <li>• Small-scale deployments</li>
                </ul>
              </div>

              <div className="bg-slate-800/30 border border-slate-600/30 p-4 rounded">
                <h4 className="text-gray-200 font-medium mb-2">HIGH RISK:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Production without enterprise support</li>
                  <li>• Mission-critical systems</li>
                  <li>• Expecting commercial-level support</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
}
