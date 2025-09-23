import type { SearchConfig } from './search-types';
import type { BaseContentItem } from './content-types';

// Internal FAQ item structure
interface FAQItemRaw {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[];
}

// Public FAQ item interface extending BaseContentItem
export interface FAQItem extends BaseContentItem {
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[]; // Required field from BaseContentItem
}

export enum FAQCategory {
  GETTING_STARTED = 'getting-started',
  IMPLEMENTATION = 'implementation',
  ARCHITECTURE = 'architecture',
  BUSINESS_VALUE = 'business-value',
  PLATFORM_EVOLUTION = 'platform-evolution',
}

export const FAQ_CATEGORY_LABELS: Record<FAQCategory, string> = {
  [FAQCategory.GETTING_STARTED]: 'Getting Started',
  [FAQCategory.IMPLEMENTATION]: 'Implementation',
  [FAQCategory.ARCHITECTURE]: 'Architecture',
  [FAQCategory.BUSINESS_VALUE]: 'Business Value',
  [FAQCategory.PLATFORM_EVOLUTION]: 'Platform Evolution',
};

const FAQ_DATA_RAW: FAQItemRaw[] = [
  // Getting Started Category (25%)
  {
    id: 'installation-time',
    question: 'How long does installation actually take?',
    answer: `KubeRocketAI installation is designed to be completed in **under 3 minutes**:

1. **Install CLI** (30 seconds): Download and install the krci-ai CLI tool
2. **Install Framework** (20 seconds): Run \`krci-ai install\` to set up local agents
3. **IDE Integration** (automatic): Your AI-powered IDE automatically detects the framework

\`\`\`bash
# macOS installation
brew tap KubeRocketCI/homebrew-tap
brew install krci-ai

# Install framework with IDE integration
krci-ai install --ide=claude
# Done! Your IDE now has access to SDLC agents
\`\`\`

For detailed installation steps and troubleshooting, see our [Quick Start Guide](/quickstart).`,
    category: FAQCategory.GETTING_STARTED,
    tags: ['installation', 'setup', 'time', 'cli', 'quick'],
  },
  {
    id: 'ide-support',
    question: 'Which IDEs are fully supported?',
    answer: `KubeRocketAI works with **any AI-powered IDE** through automated configuration generation:

**Officially Supported:**
- **Cursor** - Generates \`.cursor/rules/*.mdc\` files for native integration
- **Claude** - Creates \`.claude/commands/*.md\` files for web-based IDE
- **VS Code** - Configures GitHub Copilot Chat integration via \`.vscode/\`
- **Windsurf** - Generates \`.windsurf/rules/*.md\` files for Cascade interface

**Installation Examples:**
\`\`\`bash
krci-ai install --ide=cursor   # Cursor IDE integration
krci-ai install --ide=claude   # Claude IDE integration
krci-ai install --ide=vscode   # GitHub Copilot integration
krci-ai install --ide=windsurf # Windsurf IDE integration
krci-ai install --ide=all      # All IDE integrations
\`\`\`

**Universal Compatibility:**
The framework uses **declarative AI-as-Code** files that any AI IDE can read from the filesystem. No plugins or extensions required.

See our complete IDE compatibility overview in the [Supported IDEs](/architecture#supported-ides) section.`,
    category: FAQCategory.GETTING_STARTED,
    tags: ['ide', 'cursor', 'claude', 'vscode', 'windsurf', 'compatibility'],
  },
  {
    id: 'existing-ai-tools',
    question: 'Can I use this with my existing AI tools?',
    answer: `Yes! KubeRocketAI **enhances** your existing AI workflow rather than replacing it:

**Compatibility with:**
- GitHub Copilot Chat integration (via VS Code)
- Web chat tools (ChatGPT, Claude, Gemini) via bundle export
- Existing prompt libraries and custom workflows
- IDE-based AI assistants (Cursor, Claude Code, Windsurf)

**How it works together:**
- KubeRocketAI provides **structured agent personas** for SDLC tasks
- Your existing tools handle **general coding assistance**
- The framework maintains **project context** in version-controlled files
- Export bundles to web chat tools: \`krci-ai bundle --all --output project-context.md\`

**Example Workflow:**
1. Use \`/pm\` agent in Claude Code for project planning
2. Switch to GitHub Copilot for code completion
3. Export framework context for web chat: \`krci-ai bundle --agent qa\`
4. All context is maintained in your \`.krci-ai/\` project files

Learn how to set up integration with your existing tools in our [Quick Start Guide](/quickstart).`,
    category: FAQCategory.GETTING_STARTED,
    tags: ['compatibility', 'copilot', 'chatgpt', 'existing-tools', 'workflow', 'bundle'],
  },
  {
    id: 'unsupported-ide',
    question: "What if my IDE isn't supported yet?",
    answer: `Even if your IDE isn't explicitly supported, KubeRocketAI provides several fallback options:

**Fallback Options:**
1. **Bundle Export**: Generate complete framework bundles for any AI tool
   \`\`\`bash
   krci-ai bundle --all --output my-framework.md
   krci-ai bundle --agent pm,architect --output targeted.md
   \`\`\`

2. **Direct File Access**: Reference agent files from \`.krci-ai/\` directory
   - Agents: \`.krci-ai/agents/*.yaml\`
   - Tasks: \`.krci-ai/tasks/*.md\`
   - Templates: \`.krci-ai/templates/*.md\`

3. **Manual Import**: Copy generated bundles into your AI tool's prompt library

**Community Contributions:**
- **Request IDE Support**: Submit feature requests for new IDE integrations
- **Open Source**: Submit compatibility reports for your IDE
- **Documentation**: Help us document setup for additional tools
- **Testing**: Join our community testing program

**Universal Principles:**
The framework uses standard text files and markdown - any AI tool that can read files can use KubeRocketAI agents. The bundle system works with ChatGPT, Claude Web, Gemini Pro, and any other AI platform.

Check our [Quick Start Guide](/quickstart) for alternative setup methods and [supported IDE sections](/architecture#supported-ides) for community contributions.`,
    category: FAQCategory.GETTING_STARTED,
    tags: ['unsupported', 'manual', 'bundle', 'community', 'compatibility'],
  },
  {
    id: 'permissions-setup',
    question: 'Do I need any special permissions or setup?',
    answer: `KubeRocketAI requires **minimal setup** with standard development permissions:

**System Requirements:**
- Git repository access (for version control)
- File system read/write permissions in your project directory
- Package manager access (Homebrew) OR admin access for binary installation

**Installation Methods:**
\`\`\`bash
# Homebrew (no admin required)
brew tap KubeRocketCI/homebrew-tap
brew install krci-ai

# Direct binary (requires sudo for /usr/local/bin/)
curl -L "..." | tar -xz
sudo mv krci-ai /usr/local/bin/
\`\`\`

**No Special Permissions Needed:**
- ❌ No network firewall changes during development
- ❌ No IDE plugin installations
- ❌ No company security approvals for additional tools
- ❌ No Node.js or additional runtime dependencies

**Secure by Design:**
- All agent definitions stored locally in your project
- Standard Git workflow for version control
- Compatible with corporate development environments

**Team Setup:**
Each team member installs individually.

See our [Quick Start Guide](/quickstart) for complete setup requirements and installation steps.`,
    category: FAQCategory.GETTING_STARTED,
    tags: ['permissions', 'security', 'setup', 'requirements', 'corporate'],
  },

  // Implementation Category (25%)
  {
    id: 'agent-validation',
    question: 'How does agent validation work?',
    answer: `KubeRocketAI includes **built-in validation** to ensure framework quality and consistency:

**Validation Process:**
1. **Schema Validation**: Checks agent YAML files for schema compliance
2. **Task Path Validation**: Verifies task references in agent definitions are accessible
3. **Template Validation**: Validates template file structure and accessibility
4. **Markdown Validation**: Checks markdown format and links in task files
5. **Cross-Platform Compatibility**: Ensures file accessibility across platforms

**CLI Validation Commands:**
\`\`\`bash
# Validate entire framework
krci-ai validate

# Detailed validation report
krci-ai validate --verbose

# Minimal output (summary only)
krci-ai validate --quiet
\`\`\`

**What Gets Validated:**
- Agent YAML files in \`.krci-ai/agents/\`
- Task files referenced by agents
- Template file structure and links
- Markdown links to framework files
- Framework directory structure integrity

**Integration Options:**
- **CI/CD Integration**: Include \`krci-ai validate\` in your build pipeline
- **Manual Verification**: Run before committing framework changes

See practical validation examples in our [Quick Start Guide](/quickstart).`,
    category: FAQCategory.IMPLEMENTATION,
    tags: ['validation', 'testing', 'cli', 'quality', 'schema'],
  },
  {
    id: 'agent-customization',
    question: 'Can I customize agent behavior?',
    answer: `Yes! KubeRocketAI agents support **customization** while maintaining framework consistency:

**Customization Options:**
1. **Bootstrap Instructions**: Custom activation behavior via \`customization\` field
2. **Local Agent Files**: Create project-specific agents in \`.krci-ai/agents/\`
3. **Custom Commands**: Define additional commands for specific workflows
4. **Task References**: Link agents to custom task files

**Example Customization:**
\`\`\`yaml
# .krci-ai/agents/custom-pm.yaml
agent:
  identity:
    name: "Project Manager"
    role: "Senior Product Manager"
    goal: "Drive product success"

  customization: |
    Always start conversations by asking about the user's specific
    industry context. Tailor all advice to that industry's unique
    challenges and opportunities.

  commands:
    create-prd: "Create comprehensive PRD"
    custom-workflow: "Execute custom team workflow"

  tasks:
    - ./.krci-ai/tasks/team-specific-prd.md
\`\`\`

**Framework Guidelines:**
- **Validation Required**: Custom agents must pass \`krci-ai validate\`
- **Standard Structure**: Follow YAML schema requirements
- **Backward Compatibility**: Empty customization uses default behavior

Learn more about the framework structure in our [Architecture Guide](/architecture).`,
    category: FAQCategory.IMPLEMENTATION,
    tags: ['customization', 'agents', 'configuration', 'yaml', 'bootstrap'],
  },
  {
    id: 'troubleshooting',
    question: 'How do I troubleshoot common issues?',
    answer: `KubeRocketAI provides **built-in diagnostic tools** for common issues:

**Common Issues & Solutions:**

**1. Framework Not Working:**
\`\`\`bash
# Validate entire framework
krci-ai validate

# Get detailed validation report
krci-ai validate --verbose

# Check what's installed
krci-ai list agents
\`\`\`

**2. Installation Issues:**
\`\`\`bash
# Reinstall framework components
krci-ai install --force

# Install with specific IDE integration
krci-ai install --ide=cursor --force

# Verify installation
krci-ai validate
\`\`\`

**3. Command Help:**
\`\`\`bash
# Get general help
krci-ai --help

# Get help for specific commands
krci-ai install --help
krci-ai bundle --help
krci-ai validate --help
\`\`\`

**4. Token Analysis Issues:**
\`\`\`bash
# Check token usage
krci-ai tokens --all

# Analyze specific agents
krci-ai tokens --agent pm
\`\`\`

**Community Support:**
- GitHub Issues for bug reports
- Documentation in \`docs-krci/\` folder
- CLI help commands for immediate assistance

Additional troubleshooting steps are available in our [Quick Start Guide](/quickstart).`,
    category: FAQCategory.IMPLEMENTATION,
    tags: ['troubleshooting', 'debugging', 'cli', 'issues', 'support'],
  },
  {
    id: 'learning-curve',
    question: "What's the learning curve for my team?",
    answer: `KubeRocketAI is designed for **minimal learning curve** with immediate productivity:

**Adoption Timeline:**
- **Day 1**: Install and start using basic agent commands
- **Week 1**: Comfortable with all 8+ core SDLC agents (PM, Architect, Developer, QA, BA, PO, etc.)
- **Month 1**: Customizing agents for team-specific workflows

**Team Roles & Adoption Speed:**

**Immediate (0-1 day):**
- Developers already using AI IDEs
- Teams familiar with ChatGPT/Claude

**Quick (1-3 days):**
- Traditional developers new to AI tools
- Project managers learning AI-assisted planning

**Gradual (1-2 weeks):**
- Teams transitioning from manual SDLC processes
- Organizations establishing new development workflows

**Learning Resources:**
- **CLI Help**: Built-in help for all commands (\`krci-ai --help\`)
- **Documentation**: Comprehensive docs in \`docs-krci/\` folder
- **Quick Start Guide**: Get running in 3 minutes
- **Framework Examples**: Real project templates and patterns
- **Agent Validation**: Built-in validation to ensure correct usage

**Getting Started:**
\`\`\`bash
# Start with basic installation
krci-ai install --ide=cursor

# List available agents
krci-ai list agents

# Validate your setup
krci-ai validate
\`\`\`

See which team profile matches yours in our [Use Cases](/use-cases) section.`,
    category: FAQCategory.IMPLEMENTATION,
    tags: ['learning-curve', 'adoption', 'training', 'team', 'onboarding'],
  },
  {
    id: 'agent-updates',
    question: 'How do I update agents when framework changes?',
    answer: `KubeRocketAI provides **update management** through CLI and framework refresh:

**Update Process:**
1. **CLI Updates**: Update via Homebrew or GitHub releases
2. **Framework Refresh**: Reinstall framework components
3. **Version Checking**: Check for available updates
4. **Manual Backup**: Save customizations before updates

**Update Commands:**
\`\`\`bash
# Update CLI tool (macOS)
brew upgrade krci-ai

# Check for available updates
krci-ai check-updates

# Reinstall framework (preserves custom agents)
krci-ai install --force

# Validate after update
krci-ai validate
\`\`\`

**Managing Custom Agents:**
- **Backup First**: Copy \`.krci-ai/agents/\` before major updates
- **Custom Agents**: Your custom agents in \`.krci-ai/agents/\` are preserved
- **Version Control**: Use Git to track your agent customizations
- **Validation**: Run \`krci-ai validate\` after updates

**Team Synchronization:**
- **Git Workflow**: Commit agent changes to version control
- **Shared Updates**: Pull framework updates through Git
- **Custom Preservation**: Team customizations maintained separately`,
    category: FAQCategory.IMPLEMENTATION,
    tags: ['updates', 'versioning', 'cli', 'git', 'migration'],
  },

  // Architecture Category (20%)
  {
    id: 'vs-manual-prompting',
    question: 'How does this differ from manual prompting?',
    answer: `KubeRocketAI provides **systematic advantages** over ad-hoc AI prompting:

**Manual Prompting Problems:**
- ❌ Inconsistent agent personas across team members
- ❌ No version control for prompt evolution
- ❌ Context loss between sessions
- ❌ No validation of prompt quality

**KubeRocketAI Solutions:**
- ✅ **Standardized Agents**: Consistent SDLC roles across your team
- ✅ **Version Controlled**: All agent definitions in Git with history
- ✅ **Context Persistence**: Project context maintained in \`.krci-ai/\` files
- ✅ **Quality Assurance**: Built-in validation and testing

**Example Comparison:**
\`\`\`
Manual: "Act as a product manager and help me write requirements..."

KubeRocketAI:
# In IDE
/pm
create-prd

# Or export for web chat
krci-ai bundle --agent pm --task create-prd
\`\`\`

**Framework Benefits:**
- **Reproducible Results**: Same inputs produce consistent outputs
- **Team Collaboration**: Shared agent definitions and workflows in Git
- **Knowledge Capture**: Accumulated team expertise in agent configurations
- **Validation**: \`krci-ai validate\` ensures agent quality before use

Explore our complete [system architecture](/architecture) to understand the framework approach.`,
    category: FAQCategory.ARCHITECTURE,
    tags: ['manual-prompting', 'comparison', 'consistency', 'version-control'],
  },
  {
    id: 'prompt-management-tool',
    question: 'Is this just another prompt management tool?',
    answer: `No - KubeRocketAI is a **comprehensive SDLC framework**, not just prompt storage:

**Beyond Prompt Management:**
- **SDLC Integration**: 8+ agents covering complete software development lifecycle
- **Framework Validation**: Built-in \`krci-ai validate\` for quality assurance
- **Structured Methodology**: Agents, tasks, templates, and data work together
- **Team Coordination**: Version-controlled agent definitions for consistency

**Key Differentiators:**

**1. SDLC-Specific Design:**
- Agents understand software development lifecycle (PM, Architect, Developer, QA, BA, PO, etc.)
- Task dependencies and workflow integration
- Project-specific context through \`.krci-ai/\` directory

**2. Framework Integration:**
- Git-native version control for all components
- CLI tools for validation, bundling, and management
- IDE integration without plugins (Cursor, Claude, VS Code, Windsurf)

**3. Quality Assurance:**
- \`krci-ai validate\` ensures framework integrity
- Schema validation for agent definitions
- Comprehensive error reporting and debugging

**Prompt management tools** store text templates. **KubeRocketAI** provides an integrated development methodology with validation, version control, and SDLC-specific workflows.

See the full technical architecture in our [Architecture Guide](/architecture).`,
    category: FAQCategory.ARCHITECTURE,
    tags: ['framework', 'prompt-management', 'sdlc', 'methodology'],
  },
  {
    id: 'version-control',
    question: 'How does version control work with agents?',
    answer: `KubeRocketAI is **Git-native** with full version control integration:

**Agent Version Control:**
- **Standard Git Workflow**: Commit, branch, merge agent configurations
- **Diff Visibility**: See exactly what changed in agent definitions (YAML files)
- **Team Collaboration**: Share agent improvements through pull requests
- **Release Management**: Tag stable agent versions for production use

**File Structure:**
\`\`\`
.krci-ai/
├── agents/
│   ├── pm.yaml          # Product Manager agent
│   ├── architect.yaml   # Software Architect agent
│   ├── developer.yaml   # Developer agent
│   ├── qa.yaml          # QA Engineer agent
│   ├── ba.yaml          # Business Analyst agent
│   └── po.yaml          # Product Owner agent
├── tasks/
│   ├── create-prd.md    # Task definitions
│   └── implement-feature.md
├── templates/
│   └── story.md         # Output templates
├── data/
│   └── coding-standards.md  # Reference data
└── local/               # Project-specific overrides
    ├── tasks/
    ├── templates/
    └── data/
\`\`\`

**Team Workflows:**
- **Standard Git**: Use branches, commits, and merges like any code project
- **Validation**: Run \`krci-ai validate\` before commits
- **Pull Requests**: Review agent changes through normal PR process
- **Custom Agents**: Add project-specific agents in the agents directory

Learn more about framework components in our [Architecture Guide](/architecture).`,
    category: FAQCategory.ARCHITECTURE,
    tags: ['version-control', 'git', 'collaboration', 'workflow'],
  },
  {
    id: 'framework-updates',
    question: 'What happens when KubeRocketAI updates?',
    answer: `KubeRocketAI updates follow **standard software practices** with backward compatibility focus:

**Update Strategy:**
- **Backward Compatibility**: New versions maintain compatibility with existing configurations
- **Manual Migration**: Breaking changes include clear migration documentation
- **Version Control**: Use Git to track and manage your customizations
- **Validation**: Run \`krci-ai validate\` after framework updates

**Update Process:**
1. **Check for Updates**: Use \`krci-ai check-updates\` to see available versions
2. **Update CLI**: Update via package manager (\`brew upgrade krci-ai\`)
3. **Update Framework**: Reinstall framework (\`krci-ai install --force\`)
4. **Validate**: Ensure everything works (\`krci-ai validate\`)

**Managing Changes:**
- **Backup First**: Commit your \`.krci-ai/\` directory to Git before updates
- **Custom Preservation**: Your custom agents and configurations are preserved
- **Documentation**: Release notes explain any breaking changes
- **Community Support**: Get help through GitHub issues and documentation

**Best Practices:**
\`\`\`bash
# Before updating
git add .krci-ai/
git commit -m "Backup before KubeRocketAI update"

# Update CLI and framework
brew upgrade krci-ai
krci-ai install --force
krci-ai validate
\`\`\``,
    category: FAQCategory.ARCHITECTURE,
    tags: ['updates', 'compatibility', 'migration', 'versioning'],
  },

  // Business Value Category (15%)
  {
    id: 'adoption-value',
    question: 'Why should my team adopt this vs. current approach?',
    answer: `KubeRocketAI addresses **documented inefficiencies** in current AI-assisted development:

**Problems KubeRocketAI Solves:**

**Current Pain Points:**
- **15-20% increase in code review cycles** due to inconsistent AI outputs
- **60% of web-based AI interactions** produce generic responses requiring manual adaptation
- **40% of organizations** lack AI change tracking for compliance
- **Token limit failures** affect 20% of AI deployments

**KubeRocketAI Solutions:**
- **Consistent Outputs**: Standardized agent personas reduce review cycles
- **Project Context**: AI responses align with your architecture and standards
- **Version Control**: Full Git integration for AI change tracking
- **Token Management**: Built-in validation prevents context limit failures

**Framework Benefits:**
- **Standardized Workflow**: 8+ SDLC agents (PM, Architect, Developer, QA, BA, PO, etc.)
- **Team Coordination**: Shared agent definitions across team members
- **Knowledge Retention**: Capture team expertise in version-controlled agents
- **Quality Assurance**: \`krci-ai validate\` ensures framework integrity

**Competitive Advantages:**
- **AI-Native Methodology**: Designed for AI-enhanced development
- **Scalable Framework**: Grows with your team and projects
- **Future-Ready**: Prepared for evolving AI development tools

**Adoption Benefits:**
Focus on reducing inefficiencies and standardizing AI interactions rather than specific percentage improvements.

Discover if your team profile matches our target users in [Use Cases](/use-cases).`,
    category: FAQCategory.BUSINESS_VALUE,
    tags: ['roi', 'efficiency', 'benefits', 'adoption', 'value'],
  },
  {
    id: 'success-metrics',
    question: 'How do I measure success with KubeRocketAI?',
    answer: `While KubeRocketAI doesn't have built-in analytics, you can measure success through **observable development improvements**:

**Observable Success Indicators:**
- **Faster Documentation**: Reduced time for requirements, PRDs, and technical specs
- **Consistent Decisions**: Standardized architectural patterns across projects
- **Improved Handoffs**: Clearer role transitions (PM → Dev → QA)
- **Knowledge Sharing**: Better context preservation in project files

**Manual Measurement Approaches:**
- **Before/After Timing**: Compare task completion times pre and post-adoption
- **Code Review Quality**: Track reduction in architectural inconsistencies
- **Team Surveys**: Measure developer satisfaction and workflow efficiency
- **Documentation Audit**: Assess completeness and consistency improvements

**Git-Based Tracking:**
\`\`\`bash
# Track agent usage in commit messages
git log --grep="@pm" --oneline

# Monitor framework file changes
git log --stat .krci-ai/
\`\`\`

**Future Roadmap:**
The framework is being enhanced with analytics capabilities as part of ongoing development. Current focus is on core functionality and stability.

**Team Success Patterns:**
- Teams typically see immediate improvements in documentation quality
- Reduced "where do I start?" questions from new team members
- More consistent project structures and development approaches`,
    category: FAQCategory.BUSINESS_VALUE,
    tags: ['success', 'measurement', 'adoption', 'productivity', 'tracking'],
  },
  {
    id: 'vendor-lock-in',
    question: "What's the risk of vendor lock-in?",
    answer: `KubeRocketAI is designed to **minimize vendor lock-in** with open architecture:

**Open Architecture Foundation:**
- ✅ **Standard Formats**: YAML and Markdown agent definitions
- ✅ **Git Integration**: Your data stays in your repositories
- ✅ **Text-Based Files**: All configurations in human-readable formats
- ✅ **Manual Extraction**: Copy/paste agent definitions to any platform

**Migration Freedom:**
- **Agent Portability**: All agent definitions are in standard YAML/Markdown
- **Data Ownership**: All project context remains in your Git repositories
- **Standard Interfaces**: Uses common development tools and practices
- **Bundle System**: Generate consolidated files for any AI platform

**Vendor-Agnostic Design:**
- **Multiple AI Provider Support**: Works with ChatGPT, Claude, Gemini, and others
- **IDE Flexibility**: Not locked to specific development environments
- **Cloud Independence**: Runs locally with no external dependencies

**Exit Strategy:**
If you decide to stop using KubeRocketAI:
1. All agent definitions remain in \`.krci-ai/\` directory as readable files
2. Use \`krci-ai bundle\` to create consolidated files for other platforms
3. Copy agent instructions directly into any AI tool's prompt library
4. Continue using accumulated knowledge and patterns independently

**Future Considerations:**
License and open source status to be determined as the project evolves.`,
    category: FAQCategory.BUSINESS_VALUE,
    tags: ['vendor-lock-in', 'portability', 'migration', 'architecture'],
  },
  {
    id: 'workflow-integration',
    question: 'How does this fit into our existing workflow?',
    answer: `KubeRocketAI **enhances existing workflows** without requiring major process changes:

**Integration Approaches:**

**1. Gradual Adoption:**
- Start with one agent (e.g., Developer agent for code reviews)
- Expand to planning agents (PM, BA) over time
- Full SDLC integration when team is comfortable

**2. Role-Specific Integration:**
- **Product Managers**: Use PM agent for requirement documentation
- **Developers**: Integrate Dev agent with existing code review process
- **QA Engineers**: Add QA agent to testing workflows

**3. File-Based Integration:**
- **Git Workflow**: All agents work with your existing Git repository
- **Documentation**: Generate/improve docs in your current format
- **Manual Copy/Paste**: Transfer agent outputs to your existing tools

**Common Workflow Enhancements:**

**Before:** Manual requirement docs → Ad-hoc development → Manual testing
**After:** PM agent requirements → Dev agent code patterns → QA agent test strategies

**Migration Strategy:**
- **Phase 1**: Parallel run (existing process + KubeRocketAI)
- **Phase 2**: Selective replacement (high-value activities first)
- **Phase 3**: Integration with your team's preferred tools

**Future Integrations:**
Direct tool integrations (Jira, Azure DevOps, Slack) are planned but not currently available.

See integration approaches for different team sizes in our [Use Cases](/use-cases).`,
    category: FAQCategory.BUSINESS_VALUE,
    tags: ['workflow', 'adoption', 'process', 'migration', 'git'],
  },

  // Platform Evolution Category (15%)
  {
    id: 'kuberocketci-relationship',
    question: "What's the relationship with KubeRocketCI?",
    answer: `KubeRocketAI is the **AI enablement framework** for the KubeRocketCI platform with a clear integration roadmap:

**About KubeRocketCI:**
KubeRocketCI is an **open-source** cloud-agnostic SaaS/PaaS solution for software development, licensed under Apache License 2.0. Also called "The Rocket," it provides pre-defined CI/CD patterns and tools that allow users to start product development quickly with established code review, release, versioning, and build processes. The platform runs on Kubernetes/OpenShift and consolidates top open-source CI/CD tools. Learn more at [docs.kuberocketci.io](https://docs.kuberocketci.io/docs/about-platform).

**Current Status:**
- **Independent Framework**: KubeRocketAI works completely standalone today
- **Proven Success**: 85% reduction in AI content adjustment time achieved
- **Strategic Purpose**: AI agent framework designed to enable KubeRocketCI platform

**Integration Roadmap:**

**September 2025:**
- **KubeRocketCI Integration**: KubeRocketAI becomes native part of KubeRocketCI platform
- **Platform Adoption**: Target 100% KubeRocketCI repository coverage by November 2025

**December 2025:**
- **AI Capabilities Live**: KubeRocketCI platform enhanced with full AI features
- **Enterprise Features**: Enterprise-grade AI capabilities integrated

**March 2026:**
- **Market Deployment**: Strategic partnerships and broader market adoption

**Value Proposition:**
- **Today**: Use KubeRocketAI to improve your current development process independently
- **2025**: Native integration with KubeRocketCI platform for enhanced capabilities
- **Future**: Full AI-powered platform experience with enterprise features

View our complete integration timeline and milestones in the [Roadmap](/roadmap).`,
    category: FAQCategory.PLATFORM_EVOLUTION,
    tags: ['kuberocketci', 'integration', 'roadmap', 'platform', 'timeline'],
  },
  {
    id: 'marketing-vs-substance',
    question: 'Is this just marketing for KubeRocketCI?',
    answer: `No - KubeRocketAI delivers **immediate standalone value** regardless of future platform plans:

**Standalone Benefits Today:**
- ✅ **Complete SDLC framework** with 8+ production-ready agents
- ✅ **Real productivity gains** in development workflow
- ✅ **Open source foundation** with MIT license
- ✅ **Active development** and community support

**Evidence of Substance:**
- **Working CLI**: Full-featured command-line interface
- **GitHub Repository**: Active development with commit history
- **Community Adoption**: Real users and contributors
- **Documentation**: Comprehensive guides and tutorials

**Independent Value Chain:**
1. **Immediate**: Use KubeRocketAI with any AI IDE today
2. **Medium-term**: Enhanced capabilities and community contributions
3. **Long-term**: Optional integration with KubeRocketCI platform

**Commitment to Users:**
- Framework will remain **open source** and **free to use**
- **No forced migration** to paid platform services
- **Community-driven roadmap** with user needs prioritized

**Transparency:**
We're upfront about the KubeRocketCI connection while delivering real value independently.

See our transparent development timeline in the [Roadmap](/roadmap).`,
    category: FAQCategory.PLATFORM_EVOLUTION,
    tags: ['marketing', 'substance', 'standalone', 'value', 'transparency'],
  },
  {
    id: 'platform-integration-timeline',
    question: 'When will platform integration be available?',
    answer: `Platform integration follows a **clear roadmap** based on proven framework success:

**Current Status (Q3 2025):**
- ✅ **KubeRocketAI MVP Complete**: 85% reduction in AI content adjustment time achieved
- ✅ **Core Framework**: 6 production-ready agents (PM, BA, PO, Architect, Dev, QA)
- ✅ **CLI Tools**: Validation, bundling, and IDE integration capabilities

**Integration Timeline:**

**September 2025:**
- 📋 **KubeRocketCI Integration**: KubeRocketAI becomes native part of KubeRocketCI platform
- 📋 **Platform Adoption**: Target 100% KubeRocketCI repository coverage by November 2025

**December 2025:**
- 📋 **AI Capabilities Live**: KubeRocketCI platform enhanced with full AI features
- 📋 **Enterprise Features**: Enterprise-grade AI capabilities integrated

**March 2026:**
- 📋 **Market Deployment**: Strategic partnerships and broader market adoption
- 📋 **Community Growth**: Target 500+ GitHub stars and 3+ development teams

**Development Philosophy:**
**Standalone framework remains the priority** - KubeRocketAI delivers value independently while building toward platform integration based on proven success metrics.

View detailed milestones and timeline in our [Roadmap](/roadmap).`,
    category: FAQCategory.PLATFORM_EVOLUTION,
    tags: ['timeline', 'roadmap', 'integration', 'platform', '2025'],
  },
  {
    id: 'contribution-process',
    question: 'Can I contribute to framework development?',
    answer: `Yes! KubeRocketAI is open for **community contributions** as the project evolves:

**Contribution Areas:**

**1. Agent Development:**
- Create new specialized agents (DevOps, Security, UX)
- Enhance existing agent capabilities
- Submit agent templates for specific industries/frameworks

**2. Framework Core:**
- CLI tool improvements and new features
- IDE integration enhancements
- Performance optimization and bug fixes

**3. Documentation & Community:**
- Tutorial creation and improvement
- Documentation updates and corrections
- Community support and knowledge sharing

**Contribution Process:**
\`\`\`bash
# Fork the repository
git clone https://github.com/KubeRocketCI/kuberocketai
cd kuberocketai

# Create feature branch
git checkout -b feature/my-contribution

# Make changes and validate
krci-ai validate
# Test your changes

# Submit pull request
gh pr create --title "Add DevOps agent" --body "Description..."
\`\`\`

**Current Status:**
The project is in active development. Contribution guidelines, community channels, and recognition programs are being established as the project matures.

**Getting Started:**
Check the [GitHub repository](https://github.com/KubeRocketCI/kuberocketai) for current contribution opportunities and development status.`,
    category: FAQCategory.PLATFORM_EVOLUTION,
    tags: ['contribution', 'development', 'community', 'github', 'open-source'],
  },
];

export const getTopFAQs = (count: number = 4): FAQItem[] => {
  return FAQ_DATA.slice(0, count);
};

export const getFAQsByCategory = (category: FAQCategory): FAQItem[] => {
  return FAQ_DATA.filter(faq => faq.category === category);
};

export const searchFAQs = (query: string): FAQItem[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return FAQ_DATA;

  return FAQ_DATA.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm)),
  );
};

export const getQuickstartFAQs = (): FAQItem[] => {
  // Return FAQs most relevant to quickstart/installation
  return FAQ_DATA.filter(
    faq =>
      faq.category === FAQCategory.GETTING_STARTED ||
      faq.tags.some(tag =>
        ['installation', 'setup', 'ide', 'quick', 'cli'].includes(tag.toLowerCase()),
      ),
  ).slice(0, 4); // Show 4 items to match main page
};

export const getArchitectureFAQs = (): FAQItem[] => {
  // Return FAQs most relevant to architecture/technical details
  return FAQ_DATA.filter(
    faq =>
      faq.category === FAQCategory.ARCHITECTURE ||
      faq.tags.some(tag =>
        ['architecture', 'framework', 'version-control', 'git', 'sdlc'].includes(tag.toLowerCase()),
      ),
  ).slice(0, 4); // Show 4 items to match main page
};

export const getRoadmapFAQs = (): FAQItem[] => {
  // Return FAQs most relevant to roadmap/platform evolution
  return FAQ_DATA.filter(
    faq =>
      faq.category === FAQCategory.PLATFORM_EVOLUTION ||
      faq.tags.some(tag =>
        ['kuberocketci', 'roadmap', 'platform', 'timeline', 'integration'].includes(
          tag.toLowerCase(),
        ),
      ),
  ).slice(0, 4); // Show 4 items to match main page
};

export const getUseCasesFAQs = (): FAQItem[] => {
  // Return FAQs most relevant to use cases/business value
  return FAQ_DATA.filter(
    faq =>
      faq.category === FAQCategory.BUSINESS_VALUE ||
      faq.tags.some(tag =>
        ['adoption', 'workflow', 'team', 'value', 'benefits'].includes(tag.toLowerCase()),
      ),
  ).slice(0, 4); // Show 4 items to match main page
};

// Transform raw FAQ data to BaseContentItem-compatible format
const transformFAQForSearch = (faq: FAQItemRaw): FAQItem => ({
  ...faq,
  categories: [faq.category], // Convert single category to array
  name: faq.question, // Use question as searchable name
  description: faq.answer, // Use answer as searchable description
});

// Export transformed FAQ data compatible with unified search utilities
export const FAQ_DATA: FAQItem[] = FAQ_DATA_RAW.map(transformFAQForSearch);
export const FAQ_DATA_SEARCHABLE: FAQItem[] = FAQ_DATA;

// Helper to get available FAQ categories for filtering
export const getFAQCategories = (): string[] => {
  return Object.values(FAQCategory);
};

// Search configuration for FAQ items using generic SearchFilter
export const FAQ_SEARCH_CONFIG: SearchConfig = {
  searchFields: ['question', 'answer', 'name', 'description'],
  categoryField: 'categories',
  placeholder: 'Search questions...',
  debounceMs: 300,
  highlightConfig: {
    enabled: true,
    highlightClass:
      'bg-cyan-200 dark:bg-cyan-900/40 px-1 rounded text-cyan-900 dark:text-cyan-100 font-medium',
    caseSensitive: false,
    maxHighlights: 5,
  },
};
