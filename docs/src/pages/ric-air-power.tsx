import type { ReactNode } from 'react';
import { useState, createContext, useContext } from 'react';
import Layout from '@theme/Layout';
import AccordionSection from '../components/AccordionSection';
import StrategySidebar from '../components/StrategySidebar';
import styles from './ric-air-power.module.css';

// ============================================
// VIEW MODE CONTEXT
// ============================================

type ViewMode = 'airforce' | 'esimplicity';

const ViewModeContext = createContext<{
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}>({
  mode: 'airforce',
  setMode: () => {},
});

function useViewMode() {
  return useContext(ViewModeContext);
}

// Content mappings for both modes
const modeContent = {
  airforce: {
    heroTitle: 'From Ground to Air',
    heroSubtitle: 'The Air Power Revolution',
    heroDescription: 'How militaries transformed to operate at aircraft speed',
    heroBadge: 'Military History | Air Power Organization',
    toggleLabel: 'Apply to eSimplicity →',
    institutions: {
      testPrograms: {
        name: 'Edwards Air Force Base',
        subtitle: 'Air Force Test Center',
        whatItIs: "The Air Force's primary flight test center, where every new aircraft, weapons system, and major modification is tested before operational deployment.",
        whatItDoes: 'Test pilots and engineers push aircraft to their limits in controlled conditions. They find the failures <em>before</em> combat pilots do. They write the flight manuals, define the operating envelopes, and certify that systems are safe and effective.',
        whyItMatters: 'No aircraft reaches operational squadrons without passing through test. This is where "it works on my machine" meets physics. Chuck Yeager broke the sound barrier here. The F-22, F-35, B-2 — all proven here first.',
        quote: '"No one flies an aircraft that hasn\'t been through test."',
      },
      weaponsSchool: {
        name: 'TOPGUN / USAF Weapons School',
        subtitle: 'Fighter Weapons Schools',
        whatItIs: 'Graduate-level schools for the best fighter pilots, where doctrine is developed, tactics are refined, and instructors are created.',
        whatItDoes: 'Takes experienced pilots and makes them experts in air combat tactics. Graduates return to their squadrons as "patch wearers" — recognized experts who train others. TOPGUN doesn\'t just teach flying; it <em>develops the curriculum</em> that everyone else uses.',
        whyItMatters: 'After Vietnam, Navy kill ratios were embarrassingly low. TOPGUN was created to fix this. Within years, kill ratios went from 2:1 to 12:1. The school doesn\'t fly combat missions — it <em>multiplies capability</em> across the entire fleet by creating instructors and doctrine.',
        quote: '"You can\'t train fighter pilots in combat. You need a separated institution."',
      },
      demoTeams: {
        name: 'Thunderbirds / Blue Angels',
        subtitle: 'Demonstration Teams',
        whatItIs: 'Elite demonstration squadrons that perform precision aerial maneuvers at airshows and public events worldwide.',
        whatItDoes: 'Flies in formations with aircraft separated by as little as 18 inches at speeds exceeding 400 mph. Every maneuver is choreographed, practiced thousands of times, and executed with zero margin for error.',
        whyItMatters: 'The Thunderbirds aren\'t just showmanship — they\'re <strong>proof that disciplined excellence is possible</strong>. They demonstrate the ceiling of what coordinated, practiced teams can achieve. When skeptics say "that level of precision isn\'t realistic," the Thunderbirds are the counter-argument.',
        quote: '"This is what disciplined excellence looks like. It\'s not theoretical."',
      },
      redFlag: {
        name: 'Red Flag',
        subtitle: 'Embedded Training Exercises',
        whatItIs: 'Large-scale aerial combat training exercises held at Nellis AFB, simulating realistic combat conditions against skilled adversaries.',
        whatItDoes: 'Pits operational squadrons against "aggressor" squadrons that simulate enemy tactics. Missions are fully instrumented. Every engagement is recorded and debriefed in excruciating detail.',
        whyItMatters: 'Studies showed pilots who survived their first 10 combat missions had dramatically higher survival rates thereafter. Red Flag gives pilots those "first 10 missions" in a controlled environment. Failure here is learning, not death.',
        quote: '"You cannot learn air combat in combat. Failure must be survivable."',
      },
      manufacturing: {
        name: 'Skunk Works / Air Mobility Command',
        subtitle: 'Manufacturing & Logistics',
        whatItIs: 'The industrial base that builds the aircraft, and the logistics command that sustains operations anywhere in the world.',
        whatItDoes: 'Lockheed\'s Skunk Works developed the U-2, SR-71, F-117, and F-22 — pushing the boundaries of what\'s possible. Air Mobility Command can deploy entire air wings to bare bases anywhere on Earth.',
        whyItMatters: 'You can\'t fight an air war without aircraft, and you can\'t sustain operations without logistics. The U.S. has the <strong>manufacturing capacity to build the best aircraft</strong> and the <strong>expeditionary capability to operate them anywhere</strong>.',
        quote: '"Amateurs talk tactics. Professionals talk logistics."',
      },
    },
    missionSets: {
      testPrograms: {
        airForceTitle: 'Test Programs',
        airForceSubtitle: 'Edwards AFB, Pax River',
        ricEquivalent: 'Validation & Standards',
        mission: 'Validate tools, patterns, and agent configurations before mission teams use them. "No one flies an aircraft that hasn\'t been through test."',
        outputs: [
          'Approved agent configurations',
          'Validated patterns and templates',
          'CI/testing standards',
          'Security clearances for tools',
        ],
      },
      weaponsSchool: {
        airForceTitle: 'Fighter Weapons School',
        airForceSubtitle: 'Top Gun, USAF Weapons School',
        ricEquivalent: 'Doctrine & Methods',
        mission: 'Develop tactics, train instructors, create methods that deployed teams use. "You can\'t train fighter pilots in combat."',
        outputs: [
          'FOE Field Guide methods',
          'Agentic coding patterns',
          'Train-the-trainer programs',
          'Best practice documentation',
        ],
      },
      demoTeams: {
        airForceTitle: 'Demonstration Teams',
        airForceSubtitle: 'Thunderbirds, Blue Angels',
        ricEquivalent: 'Reference Implementations',
        mission: 'Demonstrate the ceiling of what\'s possible with full discipline. Show skeptics that high-speed disciplined delivery is real.',
        outputs: [
          'FOE docs site (this project)',
          'KATALYST reference deployments',
          'Internal showcase projects',
          'Proof points for proposals',
        ],
      },
      deployedSquadrons: {
        airForceTitle: 'Deployed Squadrons',
        airForceSubtitle: 'Operational Units',
        ricEquivalent: 'Delivery Enablement',
        mission: 'Support contract delivery teams. They execute missions; RIC provides the validated equipment and doctrine that makes success possible.',
        outputs: [
          'Onboarding for delivery teams',
          'Tool provisioning and support',
          'Pattern application guidance',
          'Escalation support',
        ],
      },
      embeddedTraining: {
        airForceTitle: 'Embedded Training',
        airForceSubtitle: 'Red Flag, Top Gun Exercises',
        ricEquivalent: 'Learning Labs',
        mission: 'Create protected environments where teams can fail safely and learn. "You cannot learn air combat in combat."',
        outputs: [
          'Sandbox environments',
          'Skill development programs',
          'Blameless postmortem facilitation',
          'Innovation experiments',
        ],
      },
      manufacturing: {
        airForceTitle: 'Manufacturing & Expeditionary',
        airForceSubtitle: 'Lockheed + Air Mobility Command + Seabees',
        ricEquivalent: 'Tooling & Theater Deployment',
        mission: 'Two complementary roles that other mission sets depend on:',
        rocketShop: {
          title: 'The Rocket Shop',
          description: 'Build the actual tools, platforms, and weapons systems that the fleet uses.',
          items: [
            'KATALYST platform development',
            'PRIMA products',
            'Agent configurations',
            'Prompt libraries',
          ],
        },
        infrastructure: {
          title: 'Infrastructure Enablement',
          description: 'Easy-button landing strips, radar, ground control — raise the ceiling for every theater.',
          items: [
            'Infrastructure-as-code packages',
            'Theater assessment playbooks',
            'Rapid environment standup',
            'Forward deployment capability',
          ],
        },
      },
    },
    act4: {
      sectionTitle: 'The Logistics Transformation',
      executiveSummary: 'Ground infantry can operate with ~1:3 combat-to-support ratios. Modern air wings need ~1:15 or higher. This isn\'t bloat—it\'s what enables the speed. The support infrastructure is what makes high-tempo operations possible.',
      multiplier: {
        input: { value: '1 hr', label: 'Air wing invests in training' },
        multiplierVal: { value: '500', label: 'pilots across squadrons' },
        output: { value: '500 hrs', label: 'combat readiness multiplied' },
      },
      enablementIntro: 'In air-power thinking, enablement is <em>multiplicative</em>:',
      leverageText: 'Every hour the Air Force spends developing tactics, training instructors, or creating doctrine is multiplied across every squadron that uses it.',
      leverageConclusion: '<strong>This is how you get leverage.</strong> This is how a small support structure enables a large operational force to fly at high tempo.',
      platformSection: {
        title: 'Platform as Infrastructure, Not Platform as Team',
        intro: 'Air forces distinguish between having logistics teams and having logistics infrastructure:',
        comparison: [
          { left: 'Ad-hoc logistics', right: 'Logistics infrastructure' },
          { left: 'Reacts to requests', right: 'Anticipates requirements' },
          { left: 'Success = tasks completed', right: 'Success = operational tempo sustained' },
          { left: 'Planning = what needs doing', right: 'Planning = what operations need' },
          { left: 'Exists because someone asked', right: 'Exists because operations require it' },
        ],
        conclusion: 'The support structure must operate as <strong>infrastructure</strong>—its purpose is defined by what operational units need to succeed.',
      },
      investmentSection: {
        title: 'The Investment Thesis',
        header: 'Air Force Investment Logic',
        rows: [
          { label: 'Input', value: 'N hours developing tactics or training' },
          { label: 'Multiplier', value: '× M squadrons using those tactics' },
          { label: 'Amplifier', value: '× K missions per squadron per year' },
          { label: 'Output', value: '= N × M × K hours of operational leverage' },
        ],
        example: 'A single doctrine update used by 20 squadrons, 100 missions per squadron, per year is <strong>2,000x leverage</strong> on the original investment.',
        rationale: 'This is why the tip-to-tail ratio shifts so dramatically. At ground speed, the math doesn\'t work—by the time you\'ve built the infrastructure, the battle is over. At air speed, the infrastructure is what makes sustained operations possible.',
      },
      triadItems: [
        { label: 'People', desc: 'Weapons Schools + Red Flag (skill development and tactics transfer)' },
        { label: 'Process', desc: 'Test Programs (how aircraft are validated)' },
        { label: 'Technology', desc: 'Skunk Works + Air Mobility Command (what equipment and logistics exist)' },
      ],
      triadIntro: 'Air power requires coordinated development across People, Process, and Technology. The support structure must address all three:',
    },
    act5: {
      sectionTitle: 'Combined Arms',
      executiveSummary: 'Air power alone doesn\'t win wars. It requires integrated ground forces, naval power, intelligence, logistics, and doctrine. Combined arms is the principle that different capabilities multiply each other when properly integrated.',
      integrationTitle: 'The Integration Requirement',
      integrationIntro: 'Having an excellent air force is necessary but not sufficient. Victory requires:',
      integrationItems: [
        { label: 'Ground forces', desc: 'to hold territory' },
        { label: 'Naval forces', desc: 'for power projection' },
        { label: 'Intelligence', desc: 'for targeting' },
        { label: 'Logistics', desc: 'for sustainment' },
        { label: 'Doctrine', desc: 'for coordination' },
      ],
      combinedArmsExplainer: 'This is <strong>combined arms</strong>—the principle that different capabilities multiply each other when properly integrated. No single arm wins alone.',
      ecosystemSection: {
        title: 'How the Support Structure Connects the Force',
        centerLabel: 'Support',
        nodes: [
          { icon: 'chart', name: 'Logistics', role: 'Sustainment' },
          { icon: 'rocket', name: 'Support HQ', role: 'Coordination' },
          { icon: 'target', name: 'Intelligence', role: 'Targeting' },
          { icon: 'book', name: 'Doctrine', role: 'Standards' },
          { icon: 'scales', name: 'Command', role: 'Direction' },
          { icon: 'users', name: 'Combat Units', role: 'Execution' },
        ],
        connectsIntro: 'The support structure sits at the center, connecting:',
        connectsItems: [
          '<strong>Logistics</strong> (sustainment) with units that need supplies',
          '<strong>Intelligence</strong> (targeting) with pilots who need information',
          '<strong>Doctrine</strong> (standards) with practical implementation',
          '<strong>Command</strong> (direction) with operational execution',
          '<strong>Combat Units</strong> with the support they need',
        ],
      },
      atcSection: {
        title: 'Command as Air Traffic Control',
        intro: 'Command functions like air traffic control: ensuring that different units operating at high speed don\'t collide. It:',
        items: [
          'Validates that units are aligned to doctrine',
          'Ensures tactical decisions support the campaign',
          'Provides feedback loops before problems compound',
        ],
        conclusion: 'But air traffic control only works if pilots follow procedures and aircraft have functioning transponders. The support structure provides the training (pilots know procedures) and the infrastructure (aircraft have transponders) that makes command effective.',
      },
      isolationSection: {
        title: 'Why Isolated Excellence Fails',
        tableRows: [
          { pattern: 'Excellent aircraft + undisciplined pilots', failure: 'Pilots misuse aircraft, create accidents, capability wasted' },
          { pattern: 'Strong doctrine + no training', failure: 'Pilots don\'t know how to apply doctrine; it becomes paperwork' },
          { pattern: 'Superior logistics + inconsistent operations', failure: 'Supplies delivered differently to each unit; support becomes chaotic' },
          { pattern: 'Active command + no support', failure: 'Command gives orders but units can\'t execute; leadership becomes disconnected' },
        ],
        conclusion: '<strong>Combined arms means all components working together.</strong> The support structure is the integration function that makes the whole greater than the sum of parts.',
      },
      virtuousCycleSection: {
        title: 'The Virtuous Cycle',
        steps: [
          'Support develops capability',
          'Combat units adopt',
          'Experience accumulates',
          'Doctrine matures',
          'New needs emerge',
        ],
        conclusion: 'Each cycle through the loop raises the floor. What was advanced tactics becomes standard. What was standard becomes instinct. The force continuously improves.',
      },
      powerProjectionIntro: 'Combined arms isn\'t just about having all the pieces—it\'s about <strong>projecting capability where it\'s needed</strong>. Different theaters require different engagement models:',
      engagementLabel: 'Engagement Model:',
      fleetLabel: 'Fleet Assets:',
      highlightBox: {
        mainPoint: '<strong>The support structure doesn\'t just enable combat units—it projects capability into theaters where that capability doesn\'t yet exist.</strong>',
        explanation: 'This is the expeditionary function. It\'s not enough to have excellent internal capability. You must be able to deploy it, adapt it to local conditions, and build local capacity to sustain it.',
      },
      theaters: {
        mature: {
          title: 'Mature Theater',
          characteristics: [
            'Full runway infrastructure',
            'Established air superiority',
            'Integrated logistics chain',
            'Experienced squadrons',
          ],
          engagementModel: 'Air Dominance Model',
          engagementDesc: 'Full spectrum operations. Strategic bombers, air superiority, close air support.',
          fleetAssets: 'Strategic Bomber, all assets available',
        },
        developing: {
          title: 'Developing Theater',
          characteristics: [
            'Limited runways',
            'Contested airspace',
            'Supply lines establishing',
            'Mixed experience levels',
          ],
          engagementModel: 'Carrier Model',
          engagementDesc: 'Bring your own runway. Establish air cover. Build local capacity.',
          fleetAssets: 'Carrier Fighter, Forward Air Controller',
        },
        austere: {
          title: 'Austere Theater',
          characteristics: [
            'No runways',
            'Hostile environment',
            'No supply chain',
            'First contact operations',
          ],
          engagementModel: 'Expeditionary Model',
          engagementDesc: 'Build infrastructure first. Sea planes until runway exists. Long-term presence.',
          fleetAssets: 'Sea Plane, Helicopter, FAC scouts first',
        },
      },
    },
    act1: {
      title: 'The Problem',
      executiveSummary: 'In 1914, aircraft were curiosities assigned to cavalry units. By 1945, air power was decisive. The nations that built institutions for air-speed operations dominated. Those that didn\'t were destroyed.',
      executiveQuote: '"You cannot fight an air war with a ground army\'s organization."',
      sections: {
        industryShift: {
          title: 'The Historical Shift',
          paragraphs: [
            'In the early 20th century, military aircraft were fragile novelties. Generals assigned them to existing cavalry and infantry units for reconnaissance. Pilots reported to ground commanders who didn\'t understand flight. Mechanics who had serviced horses now serviced biplanes.',
            'This organizational structure made sense on paper—aircraft were just another tool. But aircraft operate at speeds, altitudes, and tempos that ground organizations cannot support. The generals who recognized this earliest gained decisive advantage.',
            '<strong>By 1945, the transformation was complete.</strong> Air power didn\'t just supplement ground forces—it often decided outcomes before ground troops engaged. The nations that built dedicated air organizations dominated. Those that tried to run air operations with ground-army structures were outpaced and defeated.',
          ],
        },
        comparison: {
          groundLabel: 'Ground Army Model',
          groundItems: [
            'Heroes carry the mission',
            'Knowledge lives in heads',
            'Speed limited by human tempo',
            '~1:3 combat-to-support ratio',
            'Decisions at human speed',
            'Training happens on the job',
          ],
          airLabel: 'Air Power Model',
          airItems: [
            'Systems enable the mission',
            'Knowledge lives in doctrine',
            'Speed limited by instrumentation',
            '~1:15+ combat-to-support ratio',
            'Decisions at machine speed',
            'Training requires dedicated institutions',
          ],
        },
        bottleneck: {
          title: 'The Organizational Bottleneck',
          paragraphs: [
            'Early air forces discovered that having aircraft wasn\'t enough. You needed organizations designed specifically for air operations—test facilities, training schools, maintenance depots, intelligence systems, and doctrine development.',
          ],
          highlightQuote: '"The gap wasn\'t technology. Every nation had aircraft. The gap was organizational discipline—the institutions to develop, train, and sustain air power."',
          highlightSource: '— Military Aviation History',
          conclusion: 'Nations that tried to run air operations through existing ground army structures consistently failed. The aircraft were capable; the organizations weren\'t.',
        },
        symptoms: {
          title: 'Symptoms of Ground-Speed Organization',
          items: [
            { symptom: 'Unclear mission boundaries between units', cause: 'No defined organizational topology for air operations' },
            { symptom: 'Knowledge concentrated in ace pilots', cause: 'No doctrine institution to capture and spread knowledge' },
            { symptom: 'New pilots unprepared for combat', cause: 'No dedicated training schools' },
            { symptom: 'No standard for "combat ready"', cause: 'No test establishment defining readiness' },
            { symptom: 'Tactics developed ad-hoc in combat', cause: 'No weapons school refining doctrine' },
          ],
        },
        expeditionary: {
          title: 'The Expeditionary Requirement',
          intro: 'Air forces couldn\'t just build capability at home bases. Wars required projecting air power to distant theaters—each with different conditions:',
          theaters: [
            { name: 'Established Theaters', desc: 'Full airfields, hangars, fuel depots. Ready for sustained operations.' },
            { name: 'Forward Theaters', desc: 'Basic strips, limited infrastructure. Needs rapid buildup.' },
            { name: 'Austere Theaters', desc: 'No runways, hostile terrain. Must build from nothing.' },
          ],
          conclusion: 'This required <strong>expeditionary capability</strong>—the ability to deploy and establish infrastructure in new theaters, sometimes building the airstrip before the planes could land.',
          highlightItems: [
            '<strong>A fleet suited to different conditions</strong> — not every mission needs a heavy bomber',
            '<strong>Expeditionary capability</strong> — the ability to deploy and establish infrastructure in new theaters',
          ],
        },
      },
    },
    act2: {
      title: 'The Institutions',
      executiveSummary: 'When warfare moved from ground to air, it didn\'t just need new weapons—it needed entirely new types of organizations. These institutions took decades to develop and emerged through hard lessons.',
      historicalTransformation: {
        title: 'The Historical Transformation',
        paragraphs: [
          'In the early 20th century, armies tried to integrate aircraft using existing organizational structures. Planes were assigned to infantry divisions. Pilots reported to ground commanders. Maintenance was handled by cavalry mechanics.',
          '<strong>It didn\'t work.</strong>',
          'Aircraft operate at speeds, altitudes, and tempos that ground organizations cannot support. The solution wasn\'t better aircraft—it was entirely new organizational structures designed from the ground up for air operations:',
        ],
        institutionList: [
          '<strong>Dedicated test establishments</strong> (Edwards AFB, Pax River) to validate aircraft before operational use',
          '<strong>Fighter Weapons Schools</strong> (Top Gun, USAF Weapons School) to develop and teach doctrine',
          '<strong>Demonstration teams</strong> (Thunderbirds, Blue Angels) to prove what disciplined excellence looks like',
          '<strong>Deployed squadrons</strong> with standardized equipment and procedures',
          '<strong>Embedded training exercises</strong> (Red Flag) for realistic practice without combat consequences',
        ],
      },
      institutionsIntro: {
        title: 'The Institutions That Make Air Power Work',
        paragraph: 'These aren\'t just organizational units — they\'re <strong>institutions</strong> with specific purposes that took decades to develop. Understanding what each one does is essential to understanding air power.',
      },
      institutionsClosing: {
        paragraph: 'These institutions took <strong>decades to develop</strong>. The Air Force didn\'t have them in 1947 when it was founded. They emerged through hard lessons — lost aircraft, failed missions, embarrassing kill ratios. Each institution exists because the absence of that institution caused failures that couldn\'t be tolerated.',
        highlightParagraphs: [
          '<strong>These institutions are what made air power effective.</strong> Not because they\'re theoretically nice, but because operating at aircraft speed without them produced failures that couldn\'t be tolerated.',
          'The nations that built these institutions dominated the skies. Those that tried to operate with ground-army structures were outpaced.',
        ],
      },
      heroesSection: {
        title: 'Why Heroes Don\'t Scale at Aircraft Speed',
        highlightQuote: '"Heroes don\'t scale. Individual excellence cannot compensate for systemic gaps at the tempo of air operations."',
        highlightSource: '— Military Aviation Doctrine',
        intro: 'A heroic infantry sergeant can carry a squad through a difficult engagement. Their experience, intuition, and personal presence can compensate for systemic gaps.',
        cantCompensate: 'A heroic pilot cannot compensate for:',
        cantCompensateItems: [
          'Maintenance failures (the aircraft doesn\'t care how brave you are)',
          'Intelligence gaps (you can\'t see the threat you don\'t know about)',
          'Fuel shortages (physics wins)',
          'Coordination breakdowns (at 600 mph, miscommunication is fatal)',
        ],
        conclusion: '<strong>The system must work. Individual heroics don\'t scale to the tempo of air operations.</strong>',
        applicationParagraph: 'This principle applies to any high-tempo operation: you cannot rely on heroes when the system is moving faster than human reaction time. You need systems, institutions, and discipline.',
      },
      ratioSection: {
        title: 'The Tip-to-Tail Ratio Shift',
        leftLabel: 'WWII Infantry',
        leftValue: '1:3',
        leftDescription: 'For every 1 soldier in combat, ~3 in support',
        rightLabel: 'Modern Air Wing',
        rightValue: '1:15+',
        rightDescription: 'For every 1 pilot flying, ~15+ in support',
        explanation: 'This isn\'t bloat. This is what enables the speed. For every pilot in the air, there are:',
        supportRoles: [
          'Crew chiefs maintaining the aircraft',
          'Weapons loaders arming it',
          'Fuel specialists sustaining it',
          'Avionics technicians keeping systems operational',
          'Intelligence analysts providing targeting',
          'Mission planners preparing sorties',
          'Air traffic controllers deconflicting airspace',
          'Instructors training the next generation',
        ],
      },
      warningBox: {
        title: '<strong>The support structure IS the capability.</strong>',
        paragraph: 'You cannot run an air force with infantry logistics. The organizations that understood this dominated. Those that didn\'t were destroyed.',
      },
    },
    act3: {
      title: 'The Five Mission Sets',
      executiveSummary: 'Air forces developed distinct organizational structures with specific purposes—test establishments, weapons schools, demonstration teams, deployed squadrons, and embedded training. Each serves a unique function that cannot be absorbed by the others.',
      fleetIntro: 'Not every mission needs a strategic bomber. Different theaters require different aircraft. A sea plane beats an F-35 when operating from water.',
      fleetWarning: '<strong>The fleet must include aircraft for every condition—and the wisdom to deploy the right one.</strong> Mature theaters get strategic bombers. Legacy theaters get sea planes. Unknown theaters get forward air controllers first to assess conditions.',
      dependencyIntro: 'These mission sets are interdependent. Remove any one and the system degrades:',
      dependencies: [
        { removed: 'Test Programs', consequence: 'Untested aircraft reach combat squadrons; failures happen in combat' },
        { removed: 'Weapons School', consequence: 'No tactics evolve; pilots reinvent approaches; knowledge doesn\'t spread' },
        { removed: 'Demonstration Teams', consequence: 'No proof that precision is possible; skeptics prevail; standards slip' },
        { removed: 'Deployed Squadrons', consequence: 'No combat capability; institutions exist but don\'t fight' },
        { removed: 'Embedded Training', consequence: 'Skills stagnate; first combat is first failure; pilots stop pushing limits' },
      ],
    },
    cta: {
      title: 'The transition was not optional.',
      description: 'Every military that moved from ground to air had to restructure. Those that didn\'t were outpaced and defeated. The same principle applies to any organization facing a fundamental speed change.',
      quote: '"You cannot fly at 600 mph with a ground-speed organization."',
    },
  },
  esimplicity: {
    heroTitle: 'Enabling Agentic Delivery',
    heroSubtitle: 'The eSimplicity Transformation',
    heroDescription: 'How the RIC builds the institutions for air-speed operations',
    heroBadge: 'Internal Strategy | RIC Restructuring',
    toggleLabel: '← View Air Force Model',
    institutions: {
      testPrograms: {
        name: 'Validation & Standards',
        subtitle: 'RIC Test Programs',
        whatItIs: "The RIC's validation function, where every agent configuration, prompt library, and pattern is tested before delivery teams use them.",
        whatItDoes: 'RIC engineers validate tools in controlled conditions. They find the failures <em>before</em> delivery teams do. They write the documentation, define the usage patterns, and certify that configurations are safe and effective.',
        whyItMatters: 'No agent configuration reaches delivery teams without passing through validation. This is where "it works on my machine" meets production reality. Every tool, every pattern — proven here first.',
        quote: '"No one deploys an agent that hasn\'t been through test."',
      },
      weaponsSchool: {
        name: 'Doctrine & Methods',
        subtitle: 'RIC Agent School',
        whatItIs: 'The FOE Field Guides and training programs where methods are developed, patterns are refined, and instructors are created.',
        whatItDoes: 'Takes experienced engineers and makes them experts in agentic delivery tactics. Graduates return to their delivery teams as recognized experts who train others. The RIC doesn\'t just teach tools; it <em>develops the curriculum</em> that everyone else uses.',
        whyItMatters: 'Before FOE, delivery quality was inconsistent. The Doctrine & Methods function was created to fix this. The RIC doesn\'t execute delivery — it <em>multiplies capability</em> across all delivery teams by creating instructors and methods.',
        quote: '"You can\'t train engineers in production. You need a separated institution."',
      },
      demoTeams: {
        name: 'Reference Implementations',
        subtitle: 'RIC Demonstration Teams',
        whatItIs: 'Showcase projects like the FOE docs site and KATALYST reference deployments that demonstrate what disciplined agentic delivery looks like.',
        whatItDoes: 'Delivers projects with full FOE compliance, comprehensive testing, and zero shortcuts. Every pattern is followed, every method applied, and documented for others to learn from.',
        whyItMatters: 'Reference implementations aren\'t just showcases — they\'re <strong>proof that disciplined excellence is possible</strong>. They demonstrate the ceiling of what FOE-compliant teams can achieve. When skeptics say "that level of quality isn\'t realistic," these projects are the counter-argument.',
        quote: '"This is what disciplined excellence looks like. It\'s not theoretical."',
      },
      redFlag: {
        name: 'Learning Labs',
        subtitle: 'RIC Training Exercises',
        whatItIs: 'Sandbox environments and protected experimentation spaces where teams can try new patterns without production consequences.',
        whatItDoes: 'Creates safe spaces for delivery teams to experiment with new agent configurations, try emerging patterns, and learn through failure. Every experiment is documented and debriefed.',
        whyItMatters: 'Engineers who have failed safely in Learning Labs are dramatically more effective in production. Learning Labs give teams those "first 10 experiments" in a controlled environment. Failure here is learning, not outage.',
        quote: '"You cannot learn agentic delivery in production. Failure must be survivable."',
      },
      manufacturing: {
        name: 'Tooling & Expeditionary',
        subtitle: 'RIC Manufacturing & Deployment',
        whatItIs: 'The "rocket shop" that builds KATALYST, PRIMA, and agent configurations, plus the expeditionary capability to deploy them anywhere.',
        whatItDoes: 'The RIC builds the actual tools — platforms, products, agent configs, prompt libraries. It also deploys capability into contract theaters, bringing infrastructure where none exists.',
        whyItMatters: 'You can\'t enable agentic delivery without tools, and you can\'t scale without expeditionary capability. The RIC has the <strong>manufacturing capacity to build the best tools</strong> and the <strong>expeditionary capability to deploy them anywhere</strong>.',
        quote: '"Amateurs talk features. Professionals talk enablement."',
      },
    },
    missionSets: {
      testPrograms: {
        airForceTitle: 'Validation & Standards',
        airForceSubtitle: 'RIC Test Programs',
        ricEquivalent: 'Agent & Pattern Certification',
        mission: 'Certify agent configurations, prompt libraries, and patterns before delivery teams deploy them. "No one deploys an agent that hasn\'t been through test."',
        outputs: [
          'Certified agent configurations',
          'Approved prompt libraries',
          'Validated FOE patterns',
          'Security-cleared tools',
        ],
      },
      weaponsSchool: {
        airForceTitle: 'Doctrine & Methods',
        airForceSubtitle: 'RIC Agent School',
        ricEquivalent: 'FOE Field Guide Development',
        mission: 'Develop methods, train instructors, create the curriculum that delivery teams use. "You can\'t train engineers in production."',
        outputs: [
          'FOE Field Guide methods',
          'Agentic delivery patterns',
          'Train-the-trainer certification',
          'Best practice playbooks',
        ],
      },
      demoTeams: {
        airForceTitle: 'Reference Implementations',
        airForceSubtitle: 'RIC Demonstration Teams',
        ricEquivalent: 'Showcase Projects',
        mission: 'Demonstrate the ceiling of what\'s possible with full FOE compliance. Show skeptics that disciplined agentic delivery is real.',
        outputs: [
          'FOE docs site (this project)',
          'KATALYST reference deployments',
          'PRIMA showcase implementations',
          'Proof points for proposals',
        ],
      },
      deployedSquadrons: {
        airForceTitle: 'Delivery Enablement',
        airForceSubtitle: 'RIC Support Teams',
        ricEquivalent: 'Contract Team Support',
        mission: 'Support contract delivery teams with the validated tools and doctrine they need. RIC enables; delivery teams execute.',
        outputs: [
          'Team onboarding programs',
          'Tool provisioning & support',
          'Pattern application guidance',
          'Escalation & troubleshooting',
        ],
      },
      embeddedTraining: {
        airForceTitle: 'Learning Labs',
        airForceSubtitle: 'RIC Training Exercises',
        ricEquivalent: 'Safe Experimentation Spaces',
        mission: 'Create protected environments where teams can fail safely and learn. "You cannot learn agentic delivery in production."',
        outputs: [
          'Sandbox environments',
          'Skill development tracks',
          'Blameless postmortem facilitation',
          'Innovation experiments',
        ],
      },
      manufacturing: {
        airForceTitle: 'Tooling & Expeditionary',
        airForceSubtitle: 'RIC Manufacturing & Deployment',
        ricEquivalent: 'Tool Building & Theater Projection',
        mission: 'Two complementary roles that other mission sets depend on:',
        rocketShop: {
          title: 'The Rocket Shop',
          description: 'Build the actual tools, platforms, and agent configurations that delivery teams use.',
          items: [
            'KATALYST platform features',
            'PRIMA product development',
            'Agent configurations & prompts',
            'Automation libraries',
          ],
        },
        infrastructure: {
          title: 'Expeditionary Capability',
          description: 'Project RIC capability into contract theaters — build runways where none exist.',
          items: [
            'Theater assessment playbooks',
            'Infrastructure-as-code packages',
            'Rapid environment standup',
            'Forward deployment teams',
          ],
        },
      },
    },
    act4: {
      sectionTitle: 'The Enablement Transformation',
      executiveSummary: 'Traditional teams can operate with ~1:3 delivery-to-support ratios. Agentic-speed teams need ~1:15 or higher. This isn\'t overhead—it\'s what enables the speed. The RIC is the enablement infrastructure that makes delivery teams fly.',
      multiplier: {
        input: { value: '1 hr', label: 'RIC invests in a pattern' },
        multiplierVal: { value: '50', label: 'delivery team engineers' },
        output: { value: '50 hrs', label: 'saved across organization' },
      },
      enablementIntro: 'In RIC thinking, enablement is <em>multiplicative</em>:',
      leverageText: 'Every hour the RIC spends developing a validated pattern, documenting a method, or creating a training resource is multiplied across every delivery team that uses it.',
      leverageConclusion: '<strong>This is how you get leverage.</strong> This is how a small RIC enables a large delivery organization to operate at agentic speed.',
      platformSection: {
        title: 'Platform as Product, Not Platform as Team',
        intro: 'FOE distinguishes between having a "platform team" and having "platform as product":',
        comparison: [
          { left: 'Builds infrastructure', right: 'Serves internal customers' },
          { left: 'Delivers when done', right: 'Has SLOs and feedback loops' },
          { left: 'Success = features shipped', right: 'Success = adoption and satisfaction' },
          { left: 'Roadmap = what we want to build', right: 'Roadmap = what customers need' },
          { left: 'Exists because org chart says so', right: 'Exists because mission teams need it' },
        ],
        conclusion: 'The RIC must operate as <strong>platform as product</strong>. Its customers are the delivery teams. Its success is measured by their success.',
      },
      investmentSection: {
        title: 'The Investment Thesis',
        header: 'RIC Investment Logic',
        rows: [
          { label: 'Input', value: 'N hours of RIC capability building' },
          { label: 'Multiplier', value: '× M delivery teams using that capability' },
          { label: 'Amplifier', value: '× K times each team uses it per project' },
          { label: 'Output', value: '= N × M × K hours of leverage' },
        ],
        example: 'A single validated agent configuration used by 10 teams, 5 times per project, across 20 projects is <strong>1,000x leverage</strong> on the original investment.',
        rationale: 'This is why the tip-to-tail ratio shifts so dramatically. At ground speed, the math doesn\'t work—by the time you\'ve built the enablement, the battle is over. At air speed, the enablement is what makes sustained operations possible.',
      },
      triadItems: [
        { label: 'People', desc: 'Learning Labs + Doctrine & Methods (skill development and knowledge transfer)' },
        { label: 'Process', desc: 'Validation & Standards (how things are done)' },
        { label: 'Technology', desc: 'Reference Implementations + Delivery Enablement (what tools and patterns exist)' },
      ],
      triadIntro: 'FOE is clear that transformation requires coordinated change across People, Process, and Technology. The RIC must have mission sets that address all three:',
    },
    act5: {
      sectionTitle: 'Combined Arms',
      executiveSummary: 'Air power alone doesn\'t win wars. It requires integrated ground forces, intelligence, logistics, and doctrine. FOE is combined arms for software delivery—the RIC must be the connective tissue that integrates our capabilities.',
      integrationTitle: 'The Integration Requirement',
      integrationIntro: 'Having an excellent RIC is necessary but not sufficient. Success requires:',
      integrationItems: [
        { label: 'Delivery teams', desc: 'to execute contracts' },
        { label: 'Platforms (KATALYST)', desc: 'for infrastructure' },
        { label: 'Products (PRIMA)', desc: 'for consistency' },
        { label: 'Governance (TRB)', desc: 'for quality assurance' },
        { label: 'Doctrine (FOE)', desc: 'for coordination' },
      ],
      combinedArmsExplainer: 'This is <strong>combined enablement</strong>—the principle that different capabilities multiply each other when properly integrated. No single function wins alone.',
      ecosystemSection: {
        title: 'How RIC Connects the eSimplicity Ecosystem',
        centerLabel: 'RIC',
        nodes: [
          { icon: 'chart', name: 'KATALYST', role: 'Platform' },
          { icon: 'rocket', name: 'RIC', role: 'Enablement' },
          { icon: 'target', name: 'PRIMA', role: 'Products' },
          { icon: 'book', name: 'FOE', role: 'Doctrine' },
          { icon: 'scales', name: 'TRB', role: 'Governance' },
          { icon: 'users', name: 'Delivery Teams', role: 'Execution' },
        ],
        connectsIntro: 'The RIC sits at the center, connecting:',
        connectsItems: [
          '<strong>KATALYST</strong> (infrastructure) with teams that need to deploy on it',
          '<strong>PRIMA</strong> (products) with the patterns that make them consistent',
          '<strong>FOE</strong> (doctrine) with practical implementation',
          '<strong>TRB</strong> (governance) with day-to-day compliance',
          '<strong>Delivery Teams</strong> with the enablement they need',
        ],
      },
      atcSection: {
        title: 'The TRB as Air Traffic Control',
        intro: 'The Technical Review Board functions like air traffic control: ensuring that different actors operating at high speed don\'t collide. It:',
        items: [
          'Validates that delivery teams are aligned to FOE principles',
          'Ensures architectural decisions support the ecosystem',
          'Provides feedback loops before problems compound',
        ],
        conclusion: 'But air traffic control only works if pilots follow procedures and aircraft have functioning transponders. The RIC provides the training (pilots know procedures) and the infrastructure (aircraft have transponders) that makes TRB effective.',
      },
      isolationSection: {
        title: 'Why Isolated Excellence Fails',
        tableRows: [
          { pattern: 'Great KATALYST platform + undisciplined teams', failure: 'Teams misuse platform, create snowflakes, drift accumulates' },
          { pattern: 'Strong FOE doctrine + no training', failure: 'Teams don\'t know how to apply doctrine; it becomes shelfware' },
          { pattern: 'Excellent PRIMA products + inconsistent delivery', failure: 'Products deployed differently on each contract; support becomes impossible' },
          { pattern: 'Active TRB + no enablement', failure: 'TRB finds problems but teams can\'t fix them; governance becomes adversarial' },
        ],
        conclusion: '<strong>Combined arms means all components working together.</strong> The RIC is the integration function that makes the whole greater than the sum of parts.',
      },
      virtuousCycleSection: {
        title: 'The Virtuous Cycle',
        steps: [
          'RIC develops capability',
          'Delivery teams adopt',
          'Evidence accumulates',
          'Methods mature',
          'New needs emerge',
        ],
        conclusion: 'Each cycle through the loop raises the floor. What was advanced practice becomes standard. What was standard becomes automated. The organization continuously improves.',
      },
      powerProjectionIntro: 'Combined arms isn\'t just about having all the pieces—it\'s about <strong>projecting capability where it\'s needed</strong>. Different contract theaters require different engagement models:',
      engagementLabel: 'RIC Engagement:',
      fleetLabel: 'Fleet Assets:',
      highlightBox: {
        mainPoint: '<strong>The RIC doesn\'t just support delivery teams—it projects capability into theaters where that capability doesn\'t yet exist.</strong>',
        explanation: 'This is the expeditionary function. It\'s not enough to have excellent internal capability. You must be able to deploy it, adapt it to local conditions, and build local capacity to sustain it.',
      },
      theaters: {
        mature: {
          title: 'Mature Contract',
          characteristics: [
            'Full CI/CD pipeline',
            'Cloud-native infrastructure',
            'Observability in place',
            'Team has DevOps culture',
          ],
          engagementModel: 'Training Model',
          engagementDesc: 'Train teams on FOE doctrine. They self-serve from there. Periodic check-ins.',
          fleetAssets: 'KATALYST platform, full FOE toolkit',
        },
        developing: {
          title: 'Developing Contract',
          characteristics: [
            'Basic automation exists',
            'Some monitoring',
            'Hybrid infrastructure',
            'Team learning DevOps',
          ],
          engagementModel: 'Deployment Model',
          engagementDesc: 'RIC brings infrastructure. Deploy with team. Build local capability.',
          fleetAssets: 'PRIMA products, agent configurations',
        },
        austere: {
          title: 'Legacy Contract',
          characteristics: [
            'Manual processes',
            'Legacy systems',
            'On-prem / mainframe',
            'Limited DevOps exposure',
          ],
          engagementModel: 'Expeditionary Model',
          engagementDesc: 'Build infrastructure first. Lightweight tools until platform exists. Long-term presence.',
          fleetAssets: 'Lightweight FOE toolkit, point solutions',
        },
      },
    },
    act1: {
      title: 'The Problem',
      executiveSummary: 'The software industry is undergoing a transformation. AI agents and agentic delivery are capable of speeds previously impossible—but most organizations are still structured for human-tempo operations. The RIC exists to solve this problem for eSimplicity.',
      executiveQuote: '"You cannot operate at agentic speed with a human-tempo organization."',
      sections: {
        industryShift: {
          title: 'The Industry Shift',
          paragraphs: [
            'Software delivery is accelerating beyond what traditional organizations can support. AI agents, agentic coding, and automated pipelines are capable of speeds that were previously impossible.',
            'But most organizations—including most of eSimplicity\'s delivery teams and clients—are still structured for human-tempo operations. They have talented people doing important work, but the organizational structure wasn\'t designed for agentic-speed delivery.',
            '<strong>This is the problem the RIC exists to solve.</strong> Not just to adopt new tools, but to build the organizational infrastructure that makes agentic-speed delivery possible—and then project that capability across eSimplicity and into client environments.',
          ],
        },
        comparison: {
          groundLabel: 'Human-Tempo Model',
          groundItems: [
            'Heroes carry the mission',
            'Knowledge lives in heads',
            'Speed limited by human tempo',
            '~1:3 delivery-to-support ratio',
            'Decisions at human speed',
            'Training happens on the job',
          ],
          airLabel: 'Agentic-Speed Model',
          airItems: [
            'Systems enable the mission',
            'Knowledge lives in methods',
            'Speed limited by instrumentation',
            '~1:15+ delivery-to-support ratio',
            'Decisions at machine speed',
            'Training requires dedicated institutions',
          ],
        },
        bottleneck: {
          title: 'The Phase 3 Bottleneck Isn\'t About Tools',
          paragraphs: [
            'FOE identifies that most organizations stall at Phase 3 not because they lack modern tools, but because they lack the <em>institutional discipline</em> to use those tools as intended.',
          ],
          highlightQuote: '"The gap isn\'t technology. Every organization stuck at Phase 2 has modern tools. The gap is the institutional discipline to use those tools as intended."',
          highlightSource: '— FOE Transformation Model',
          conclusion: 'We\'re asking the RIC to be the answer to this gap. But an organization designed for human-tempo operations cannot provide agentic-speed discipline. <strong>We need to restructure the RIC itself before it can restructure how eSimplicity operates.</strong>',
        },
        symptoms: {
          title: 'The Symptoms We\'re Seeing',
          items: [
            { symptom: 'Unclear mission boundaries between teams', cause: 'No defined organizational topology for agentic-speed operations' },
            { symptom: 'Knowledge concentrated in individuals', cause: 'No doctrine/methods institution to capture and spread knowledge' },
            { symptom: 'Delivery teams unsure how to use FOE/agentic tools', cause: 'No training institution to teach them' },
            { symptom: 'No reference implementation of "what good looks like"', cause: 'No demonstration team proving disciplined excellence' },
            { symptom: 'Skills development happening ad-hoc', cause: 'No embedded training institution for safe practice' },
          ],
        },
        expeditionary: {
          title: 'The Expeditionary Challenge',
          intro: 'Unlike a product company that controls its own infrastructure, eSimplicity deploys teams to contract environments we don\'t own. Each theater is different:',
          theaters: [
            { name: 'Mature Contracts', desc: 'Full CI/CD, automation, observability. Ready for high-tempo operations.' },
            { name: 'Developing Contracts', desc: 'Basic infrastructure—needs improvement before high-tempo ops.' },
            { name: 'Legacy Contracts', desc: 'No modern infrastructure—manual processes, legacy systems.' },
          ],
          conclusion: 'The RIC can\'t just build capability and wait for teams to come get it. It must be able to <strong>project capability into diverse theaters</strong>—and sometimes build the runway before the planes can land.',
          highlightItems: [
            '<strong>A toolkit suited to different conditions</strong> — not every contract needs full KATALYST',
            '<strong>Expeditionary capability</strong> — the ability to deploy and establish infrastructure in new theaters',
          ],
        },
      },
    },
    act2: {
      title: 'The Institutions',
      executiveSummary: 'To operate at agentic speed, eSimplicity needs dedicated institutions—not just tools. The RIC is the vehicle to build and deliver these institutions across all delivery teams.',
      historicalTransformation: {
        title: 'The Institutional Requirement',
        paragraphs: [
          'Most organizations try to enable agentic delivery by adding tools to existing structures. Engineers get AI assistants. Teams get new platforms. But the organizational structure remains unchanged.',
          '<strong>This doesn\'t work.</strong>',
          'Agentic-speed delivery operates at tempos that traditional organizations cannot support. The solution isn\'t better tools—it\'s building dedicated institutions designed from the ground up for agentic operations:',
        ],
        institutionList: [
          '<strong>Validation & Standards</strong> to certify agent configurations before delivery teams use them',
          '<strong>Doctrine & Methods</strong> to develop and teach FOE patterns and agentic delivery tactics',
          '<strong>Reference Implementations</strong> to demonstrate what disciplined agentic delivery looks like',
          '<strong>Delivery Enablement</strong> with standardized tools and support',
          '<strong>Learning Labs</strong> for safe experimentation without production consequences',
        ],
      },
      institutionsIntro: {
        title: 'The RIC Institutions',
        paragraph: 'These aren\'t just teams—they\'re <strong>institutions</strong> with specific missions that require deliberate construction. Understanding what each one does is essential to understanding how the RIC enables agentic delivery.',
      },
      institutionsClosing: {
        paragraph: 'Building these institutions takes time and investment. They won\'t emerge organically. Each institution exists because the absence of that institution causes failures that can\'t be tolerated at agentic speed.',
        highlightParagraphs: [
          '<strong>eSimplicity needs each of these institutions.</strong> Not because it\'s theoretically nice, but because operating at agentic speed without them will produce failures we can\'t afford.',
          '<strong>The RIC is the vehicle to build and deliver these institutions</strong>—establishing the organizational infrastructure that makes agentic-speed operations possible across all delivery teams.',
        ],
      },
      heroesSection: {
        title: 'Why Heroes Don\'t Scale at Agentic Speed',
        highlightQuote: '"Heroes don\'t scale. You cannot hire heroes fast enough. The gap between system complexity and hero capacity always widens."',
        highlightSource: '— FOE Transformation Model',
        intro: 'A heroic senior engineer can carry a team through a difficult delivery. Their experience, intuition, and personal intervention can compensate for systemic gaps.',
        cantCompensate: 'A heroic engineer cannot compensate for:',
        cantCompensateItems: [
          'Untested agent configurations (bugs don\'t care how smart you are)',
          'Missing documentation (tribal knowledge doesn\'t scale)',
          'Inconsistent patterns (technical debt compounds)',
          'Ad-hoc processes (at agentic speed, improvisation is dangerous)',
        ],
        conclusion: '<strong>The system must work. Individual heroics don\'t scale to the tempo of agentic operations.</strong>',
        applicationParagraph: 'This is exactly what FOE says about software at agentic speed: you cannot rely on heroic engineers to maintain quality when AI agents are producing code at scale. You need systems, institutions, and discipline.',
      },
      ratioSection: {
        title: 'The Enablement Ratio Shift',
        leftLabel: 'Traditional Team',
        leftValue: '1:3',
        leftDescription: 'For every 1 developer delivering, ~3 in support',
        rightLabel: 'Agentic-Speed Team',
        rightValue: '1:15+',
        rightDescription: 'For every 1 engineer delivering, ~15+ in enablement',
        explanation: 'This isn\'t overhead. This is what enables the speed. For every engineer in delivery, the RIC provides:',
        supportRoles: [
          'Validated agent configurations',
          'Certified prompt libraries',
          'Documented methods and patterns',
          'Training and onboarding resources',
          'Reference implementations to learn from',
          'Sandbox environments for safe experimentation',
          'Escalation support when things go wrong',
          'Continuous improvement of the toolkit',
        ],
      },
      warningBox: {
        title: '<strong>The enablement structure IS the capability.</strong>',
        paragraph: 'You cannot enable agentic delivery with traditional software organization. The RIC exists to be that enablement structure.',
      },
    },
    act3: {
      title: 'The Five Mission Sets',
      executiveSummary: 'The RIC needs distinct institutional functions with specific purposes—validation, doctrine, reference implementations, delivery enablement, and learning labs. Each serves a unique function that cannot be absorbed by the others.',
      fleetIntro: 'Not every contract needs full KATALYST. Different theater maturity levels require different tooling. A lightweight toolkit beats a full platform when the infrastructure doesn\'t exist yet.',
      fleetWarning: '<strong>The RIC fleet must include tools for every condition—and the wisdom to deploy the right one.</strong> Mature contracts get the full platform. Legacy contracts get lightweight toolkits. Unknown contracts get assessments first.',
      dependencyIntro: 'These mission sets are interdependent. Remove any one and the system degrades:',
      dependencies: [
        { removed: 'Validation & Standards', consequence: 'Untested agent configs reach delivery teams; failures happen in production' },
        { removed: 'Doctrine & Methods', consequence: 'No patterns evolve; teams reinvent approaches; knowledge doesn\'t spread' },
        { removed: 'Reference Implementations', consequence: 'No proof that discipline works; skeptics prevail; adoption stalls' },
        { removed: 'Delivery Enablement', consequence: 'Teams left on their own; RIC becomes ivory tower' },
        { removed: 'Learning Labs', consequence: 'Skills stagnate; first production is first failure; engineers stop experimenting' },
      ],
    },
    cta: {
      title: 'The transition is not optional.',
      description: 'Every organization that moved from ground to air had to restructure. Those that didn\'t were outpaced. The same is true for agentic delivery.',
      quote: '"You cannot fly at 600 mph with a ground-speed organization."',
    },
  },
};



// ============================================
// SVG ICONS
// ============================================

type IconName = 
  | 'microscope' | 'target' | 'star' | 'takeoff' | 'gamepad' | 'factory'
  | 'wrench' | 'tools' | 'walking' | 'aircraft' | 'construction' | 'mountain'
  | 'users' | 'gear' | 'laptop' | 'chart' | 'rocket' | 'book' | 'scales';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

function Icon({ name, className = '', size = 24 }: IconProps): ReactNode {
  const icons: Record<IconName, ReactNode> = {
    microscope: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18h8" />
        <path d="M3 22h18" />
        <path d="M14 22a7 7 0 1 0 0-14h-1" />
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </svg>
    ),
    target: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    takeoff: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20" />
        <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 4l-5 14h-5.5a2 2 0 0 1-1.74-1L9 15.5l-1.88.94a2 2 0 0 1-1.76 0l-.24-.13a1 1 0 0 0-1.12.12l-.24.21Z" />
      </svg>
    ),
    gamepad: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <line x1="15" y1="13" x2="15.01" y2="13" />
        <line x1="18" y1="11" x2="18.01" y2="11" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
    factory: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </svg>
    ),
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
      </svg>
    ),
    tools: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M19 21v-4" />
        <path d="M19 17a2 2 0 0 0 2-2v-2a2 2 0 1 0-4 0v2a2 2 0 0 0 2 2Z" />
        <path d="M5 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
        <path d="M8 13V7" />
        <path d="M5 10h6" />
      </svg>
    ),
    walking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M9 21V13l-2-2 2-5 3 2h4" />
        <path d="M15 21v-6l-3-3" />
      </svg>
    ),
    aircraft: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
      </svg>
    ),
    construction: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="8" rx="1" />
        <path d="M17 14v7" />
        <path d="M7 14v7" />
        <path d="M17 3v3" />
        <path d="M7 3v3" />
        <path d="M10 14 2.3 6.3" />
        <path d="m14 6 7.7 7.7" />
        <path d="m8 6 8 8" />
      </svg>
    ),
    mountain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
        <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    gear: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    laptop: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    scales: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    ),
  };

  return (
    <span className={`${styles.icon} ${className}`} style={{ width: size, height: size }}>
      {icons[name]}
    </span>
  );
}

// ============================================
// SECTION DATA
// ============================================

const sections = [
  { id: 'the-problem', number: 1, title: 'The Problem', owner: 'shared' as const },
  { id: 'the-institutions', number: 2, title: 'The Institutions', owner: 'shared' as const },
  { id: 'the-five-mission-sets', number: 3, title: 'The Five Mission Sets', owner: 'shared' as const },
  { id: 'the-logistics-transformation', number: 4, title: 'The Logistics Transformation', owner: 'shared' as const },
  { id: 'combined-arms', number: 5, title: 'Combined Arms', owner: 'shared' as const },
  { id: 'the-path-forward', number: 6, title: 'The Path Forward', owner: 'shared' as const },
];

// ============================================
// MODE TOGGLE COMPONENT
// ============================================

function ModeToggle(): ReactNode {
  const { mode, setMode } = useViewMode();
  const content = modeContent[mode];
  
  const handleToggle = () => {
    setMode(mode === 'airforce' ? 'esimplicity' : 'airforce');
  };

  return (
    <button 
      className={`${styles.modeToggle} ${mode === 'esimplicity' ? styles.modeToggleActive : ''}`}
      onClick={handleToggle}
    >
      <span className={styles.modeToggleIcon}>
        {mode === 'airforce' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        )}
      </span>
      {content.toggleLabel}
    </button>
  );
}

// ============================================
// INSTITUTION CARD COMPONENT
// ============================================

type InstitutionKey = 'testPrograms' | 'weaponsSchool' | 'demoTeams' | 'redFlag' | 'manufacturing';

const institutionIcons: Record<InstitutionKey, IconName> = {
  testPrograms: 'microscope',
  weaponsSchool: 'target',
  demoTeams: 'star',
  redFlag: 'gamepad',
  manufacturing: 'factory',
};

const institutionStyles: Record<InstitutionKey, string> = {
  testPrograms: 'institutionEdwards',
  weaponsSchool: 'institutionTopgun',
  demoTeams: 'institutionThunderbirds',
  redFlag: 'institutionRedFlag',
  manufacturing: 'institutionSkunkWorks',
};

function InstitutionCard({ institutionKey }: { institutionKey: InstitutionKey }): ReactNode {
  const { mode } = useViewMode();
  const institution = modeContent[mode].institutions[institutionKey];
  const iconName = institutionIcons[institutionKey];
  const styleClass = institutionStyles[institutionKey];

  return (
    <div className={`${styles.institutionCard} ${styles[styleClass]}`}>
      <div className={styles.institutionHeader}>
        <Icon name={iconName} className={styles.institutionIcon} size={32} />
        <div className={styles.institutionName}>{institution.name}</div>
        <div className={styles.institutionSubtitle}>{institution.subtitle}</div>
      </div>
      <div className={styles.institutionBody}>
        <p>
          <strong>What it is:</strong> {institution.whatItIs}
        </p>
        <p dangerouslySetInnerHTML={{ 
          __html: `<strong>What it does:</strong> ${institution.whatItDoes}` 
        }} />
        <p dangerouslySetInnerHTML={{ 
          __html: `<strong>Why it matters:</strong> ${institution.whyItMatters}` 
        }} />
        <div className={styles.institutionQuote}>
          {institution.quote}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MISSION SET CARD COMPONENT
// ============================================

type MissionSetKey = 'testPrograms' | 'weaponsSchool' | 'demoTeams' | 'deployedSquadrons' | 'embeddedTraining' | 'manufacturing';
type StandardMissionSetKey = Exclude<MissionSetKey, 'manufacturing'>;

const missionSetIcons: Record<MissionSetKey, IconName> = {
  testPrograms: 'microscope',
  weaponsSchool: 'target',
  demoTeams: 'star',
  deployedSquadrons: 'takeoff',
  embeddedTraining: 'gamepad',
  manufacturing: 'factory',
};

function MissionSetCard({ missionSetKey }: { missionSetKey: StandardMissionSetKey }): ReactNode {
  const { mode } = useViewMode();
  const missionSet = modeContent[mode].missionSets[missionSetKey];
  const iconName = missionSetIcons[missionSetKey];

  // In Air Force mode, show AF terminology; in eSimplicity mode, show RIC terminology
  const title = mode === 'airforce' ? missionSet.airForceTitle : missionSet.ricEquivalent;
  const subtitle = missionSet.airForceSubtitle;

  return (
    <div className={styles.missionSetCard}>
      <div className={styles.missionSetHeader}>
        <Icon name={iconName} className={styles.missionSetIcon} size={36} />
        <div className={styles.missionSetTitles}>
          <div className={styles.missionSetAirForce}>{title}</div>
          <div className={styles.missionSetSubtitle}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.missionSetMission}>
        <strong>Mission:</strong> {missionSet.mission}
      </div>
      <div className={styles.missionSetOutputs}>
        <strong>Outputs:</strong>
        <ul>
          {missionSet.outputs.map((output: string, index: number) => (
            <li key={index}>{output}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MissionSetCardWide({ missionSetKey }: { missionSetKey: 'manufacturing' }): ReactNode {
  const { mode } = useViewMode();
  const missionSet = modeContent[mode].missionSets[missionSetKey];
  const iconName = missionSetIcons[missionSetKey];

  // In Air Force mode, show AF terminology; in eSimplicity mode, show RIC terminology
  const title = mode === 'airforce' ? missionSet.airForceTitle : missionSet.ricEquivalent;
  const subtitle = missionSet.airForceSubtitle;

  return (
    <div className={styles.missionSetCard + ' ' + styles.missionSetCardWide}>
      <div className={styles.missionSetHeader}>
        <Icon name={iconName} className={styles.missionSetIcon} size={36} />
        <div className={styles.missionSetTitles}>
          <div className={styles.missionSetAirForce}>{title}</div>
          <div className={styles.missionSetSubtitle}>{subtitle}</div>
        </div>
      </div>
      <div className={styles.missionSetMission}>
        <strong>Mission:</strong> {missionSet.mission}
      </div>
      <div className={styles.dualMission}>
        <div className={styles.dualMissionHalf}>
          <div className={styles.dualMissionTitle}><Icon name="wrench" size={18} /> {missionSet.rocketShop.title}</div>
          <p>{missionSet.rocketShop.description}</p>
          <ul>
            {missionSet.rocketShop.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.dualMissionHalf}>
          <div className={styles.dualMissionTitle}><Icon name="tools" size={18} /> {missionSet.infrastructure.title}</div>
          <p>{missionSet.infrastructure.description}</p>
          <ul>
            {missionSet.infrastructure.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode];

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroOrb3} />
      </div>
      <div className={styles.heroContent}>
        <span className={styles.heroBadge}>{content.heroBadge}</span>
        <h1 className={styles.heroTitle}>
          {content.heroTitle}
          <br />
          <span className={styles.heroTitleAccent}>{content.heroSubtitle}</span>
        </h1>
        <p className={styles.heroSubtitle}>
          {content.heroDescription}
        </p>
        <div className={styles.heroMeta}>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            January 2025
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            6 Acts
          </span>
          <span className={styles.heroMetaItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Audience: Leadership
          </span>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// SECTION CONTENT
// ============================================

function Act1(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].act1;
  const s = content.sections;

  return (
    <AccordionSection
      id="the-problem"
      number={1}
      title={content.title}
      owner="shared"
      executiveSummary={
        <>
          <p>{content.executiveSummary}</p>
          <blockquote>
            <p>{content.executiveQuote}</p>
          </blockquote>
        </>
      }
    >
      <h3>{s.industryShift.title}</h3>
      {s.industryShift.paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}

      <h3>What Happens When You Try to Fly with Ground Logistics</h3>
      <div className={styles.comparisonGrid}>
        <div className={styles.comparisonCard}>
          <div className={styles.comparisonCardHeader}>
            <Icon name="walking" className={styles.comparisonIcon} size={28} />
            <span className={styles.comparisonLabel}>{s.comparison.groundLabel}</span>
          </div>
          <ul>
            {s.comparison.groundItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.comparisonCard}>
          <div className={styles.comparisonCardHeader}>
            <Icon name="aircraft" className={styles.comparisonIcon} size={28} />
            <span className={styles.comparisonLabel}>{s.comparison.airLabel}</span>
          </div>
          <ul>
            {s.comparison.airItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3>{s.bottleneck.title}</h3>
      {s.bottleneck.paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      <div className={styles.highlightBox}>
        <p>{s.bottleneck.highlightQuote}</p>
        <span className={styles.highlightSource}>{s.bottleneck.highlightSource}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: s.bottleneck.conclusion }} />

      <h3>{s.symptoms.title}</h3>
      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Root Cause</th>
          </tr>
        </thead>
        <tbody>
          {s.symptoms.items.map((item, i) => (
            <tr key={i}>
              <td>{item.symptom}</td>
              <td>{item.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{s.expeditionary.title}</h3>
      <p>{s.expeditionary.intro}</p>
      <div className={styles.theaterSpectrum}>
        {s.expeditionary.theaters.map((theater, i) => (
          <div key={i} className={styles.theaterCard}>
            <Icon name={i === 0 ? 'takeoff' : i === 1 ? 'construction' : 'mountain'} className={styles.theaterIcon} size={32} />
            <div className={styles.theaterName}>{theater.name}</div>
            <div className={styles.theaterDesc}>{theater.desc}</div>
          </div>
        ))}
      </div>
      <p dangerouslySetInnerHTML={{ __html: s.expeditionary.conclusion }} />
      <div className={styles.highlightBox}>
        <p>This requires two things traditional organizations don't have:</p>
        <ol>
          {s.expeditionary.highlightItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      </div>
    </AccordionSection>
  );
}

function Act2(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].act2;

  return (
    <AccordionSection
      id="the-institutions"
      number={2}
      title={content.title}
      owner="shared"
      executiveSummary={<p>{content.executiveSummary}</p>}
    >
      <h3>{content.historicalTransformation.title}</h3>
      {content.historicalTransformation.paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      <ul>
        {content.historicalTransformation.institutionList.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{content.institutionsIntro.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: content.institutionsIntro.paragraph }} />

      <div className={styles.institutionGrid}>
        <InstitutionCard institutionKey="testPrograms" />
        <InstitutionCard institutionKey="weaponsSchool" />
        <InstitutionCard institutionKey="demoTeams" />
        <InstitutionCard institutionKey="redFlag" />
        <InstitutionCard institutionKey="manufacturing" />
      </div>

      <p dangerouslySetInnerHTML={{ __html: content.institutionsClosing.paragraph }} />

      <div className={styles.highlightBox}>
        {content.institutionsClosing.highlightParagraphs.map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      </div>

      <h3>{content.heroesSection.title}</h3>
      <div className={styles.highlightBox}>
        <p>{content.heroesSection.highlightQuote}</p>
        <span className={styles.highlightSource}>{content.heroesSection.highlightSource}</span>
      </div>
      <p>{content.heroesSection.intro}</p>
      <p>{content.heroesSection.cantCompensate}</p>
      <ul>
        {content.heroesSection.cantCompensateItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: content.heroesSection.conclusion }} />
      <p>{content.heroesSection.applicationParagraph}</p>

      <h3>{content.ratioSection.title}</h3>
      <div className={styles.ratioComparison}>
        <div className={styles.ratioCard}>
          <div className={styles.ratioValue}>{content.ratioSection.leftValue}</div>
          <div className={styles.ratioLabel}>{content.ratioSection.leftLabel}</div>
          <div className={styles.ratioDescription}>{content.ratioSection.leftDescription}</div>
          <div className={styles.ratioBar}>
            <div className={styles.ratioCombat} style={{ width: '25%' }} />
            <div className={styles.ratioSupport} style={{ width: '75%' }} />
          </div>
        </div>
        <div className={styles.ratioArrow}>→</div>
        <div className={styles.ratioCard}>
          <div className={styles.ratioValue}>{content.ratioSection.rightValue}</div>
          <div className={styles.ratioLabel}>{content.ratioSection.rightLabel}</div>
          <div className={styles.ratioDescription}>{content.ratioSection.rightDescription}</div>
          <div className={styles.ratioBar}>
            <div className={styles.ratioCombat} style={{ width: '6%' }} />
            <div className={styles.ratioSupport} style={{ width: '94%' }} />
          </div>
        </div>
      </div>
      <p>{content.ratioSection.explanation}</p>
      <ul>
        {content.ratioSection.supportRoles.map((role, i) => (
          <li key={i}>{role}</li>
        ))}
      </ul>

      <div className={styles.warningBox}>
        <p dangerouslySetInnerHTML={{ __html: content.warningBox.title }} />
        <p>{content.warningBox.paragraph}</p>
      </div>
    </AccordionSection>
  );
}

function Act3(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].act3;
  
  return (
    <AccordionSection
      id="the-five-mission-sets"
      number={3}
      title={content.title}
      owner="shared"
      executiveSummary={<p>{content.executiveSummary}</p>}
    >
      <div className={styles.missionSetGrid}>
        <MissionSetCard missionSetKey="testPrograms" />
        <MissionSetCard missionSetKey="weaponsSchool" />
        <MissionSetCard missionSetKey="demoTeams" />
        <MissionSetCard missionSetKey="deployedSquadrons" />
        <MissionSetCard missionSetKey="embeddedTraining" />
        <MissionSetCardWide missionSetKey="manufacturing" />
      </div>

      {/* THE FLEET */}
      <h3>The Fleet: Aircraft for Every Theater</h3>
      <p>{content.fleetIntro}</p>

      <div className={styles.fleetGrid}>
        {/* Strategic Bomber */}
        <div className={styles.aircraftCard}>
          <div className={styles.aircraftSilhouette}>
            <svg viewBox="0 0 200 60" className={styles.aircraftSvg}>
              {/* B-52 style bomber silhouette */}
              <path d="M10,35 L30,35 L40,30 L160,30 L170,25 L190,25 L190,35 L170,35 L160,40 L40,40 L30,35 Z" fill="currentColor"/>
              <path d="M60,30 L60,15 L70,15 L70,30" fill="currentColor"/>
              <path d="M50,40 L45,50 L55,50 L50,40" fill="currentColor"/>
              <path d="M80,40 L75,50 L85,50 L80,40" fill="currentColor"/>
              <path d="M120,40 L115,50 L125,50 L120,40" fill="currentColor"/>
              <path d="M150,40 L145,50 L155,50 L150,40" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles.aircraftInfo}>
            <div className={styles.aircraftType}>STRATEGIC BOMBER</div>
            <div className={styles.aircraftName}>KATALYST Platform</div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Requires:</span> Full runway (mature DevOps, CI/CD)
            </div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Capability:</span> Maximum payload, full FOE
            </div>
            <div className={styles.aircraftTheater}>
              <span className={styles.theaterLabel}>Theater:</span> Established contracts
            </div>
          </div>
        </div>

        {/* Carrier Fighter */}
        <div className={styles.aircraftCard}>
          <div className={styles.aircraftSilhouette}>
            <svg viewBox="0 0 200 60" className={styles.aircraftSvg}>
              {/* F/A-18 style fighter silhouette */}
              <path d="M20,30 L50,28 L80,25 L120,25 L140,20 L180,20 L185,25 L180,30 L140,30 L120,35 L80,35 L50,32 L20,30 Z" fill="currentColor"/>
              <path d="M100,25 L100,10 L110,10 L110,25" fill="currentColor"/>
              <path d="M70,35 L50,50 L60,50 L80,35" fill="currentColor"/>
              <path d="M130,35 L150,50 L140,50 L120,35" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles.aircraftInfo}>
            <div className={styles.aircraftType}>CARRIER FIGHTER</div>
            <div className={styles.aircraftName}>PRIMA Products</div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Requires:</span> Aircraft carrier (RIC brings infra)
            </div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Capability:</span> Full capability, deployable
            </div>
            <div className={styles.aircraftTheater}>
              <span className={styles.theaterLabel}>Theater:</span> Moderate maturity contracts
            </div>
          </div>
        </div>

        {/* Sea Plane */}
        <div className={styles.aircraftCard}>
          <div className={styles.aircraftSilhouette}>
            <svg viewBox="0 0 200 60" className={styles.aircraftSvg}>
              {/* PBY Catalina style seaplane silhouette */}
              <path d="M30,25 L60,22 L140,22 L170,25 L175,30 L170,35 L140,38 L60,38 L30,35 L25,30 L30,25 Z" fill="currentColor"/>
              <path d="M90,22 L90,8 L100,5 L110,8 L110,22" fill="currentColor"/>
              <path d="M50,38 L50,50 L70,50 L70,45 L55,45 L55,38" fill="currentColor"/>
              <path d="M130,38 L130,50 L150,50 L150,45 L145,45 L145,38" fill="currentColor"/>
              <ellipse cx="100" cy="50" rx="30" ry="5" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
          <div className={styles.aircraftInfo}>
            <div className={styles.aircraftType}>SEA PLANE</div>
            <div className={styles.aircraftName}>Lightweight FOE Toolkit</div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Requires:</span> Water (any environment)
            </div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Capability:</span> Lower ceiling, gets it done
            </div>
            <div className={styles.aircraftTheater}>
              <span className={styles.theaterLabel}>Theater:</span> Legacy / austere
            </div>
          </div>
        </div>

        {/* Forward Air Controller */}
        <div className={styles.aircraftCard}>
          <div className={styles.aircraftSilhouette}>
            <svg viewBox="0 0 200 60" className={styles.aircraftSvg}>
              {/* Light aircraft / Cessna style */}
              <path d="M40,30 L70,28 L130,28 L160,30 L165,32 L160,34 L130,34 L70,34 L40,32 L35,31 L40,30 Z" fill="currentColor"/>
              <path d="M95,28 L95,15 L105,15 L105,28" fill="currentColor"/>
              <path d="M75,34 L70,45 L80,45 L85,34" fill="currentColor"/>
              <path d="M115,34 L120,45 L130,45 L125,34" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles.aircraftInfo}>
            <div className={styles.aircraftType}>FORWARD AIR CONTROLLER</div>
            <div className={styles.aircraftName}>Agent Configs & Prompts</div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Requires:</span> Minimal (grass strip)
            </div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Capability:</span> Scouts, guides heavier assets
            </div>
            <div className={styles.aircraftTheater}>
              <span className={styles.theaterLabel}>Theater:</span> Any (goes in first)
            </div>
          </div>
        </div>

        {/* Utility Helicopter */}
        <div className={styles.aircraftCard}>
          <div className={styles.aircraftSilhouette}>
            <svg viewBox="0 0 200 60" className={styles.aircraftSvg}>
              {/* Helicopter silhouette */}
              <ellipse cx="100" cy="35" rx="40" ry="15" fill="currentColor"/>
              <path d="M140,30 L180,25 L180,28 L145,32" fill="currentColor"/>
              <path d="M175,22 L185,22 L185,32 L175,32 Z" fill="currentColor"/>
              <line x1="50" y1="10" x2="150" y2="10" stroke="currentColor" strokeWidth="3"/>
              <line x1="100" y1="10" x2="100" y2="20" stroke="currentColor" strokeWidth="3"/>
              <path d="M80,50 L75,55 L85,55 L80,50" fill="currentColor"/>
              <path d="M120,50 L115,55 L125,55 L120,50" fill="currentColor"/>
            </svg>
          </div>
          <div className={styles.aircraftInfo}>
            <div className={styles.aircraftType}>UTILITY HELICOPTER</div>
            <div className={styles.aircraftName}>Point Solutions & Patches</div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Requires:</span> Landing pad only
            </div>
            <div className={styles.aircraftSpecs}>
              <span className={styles.specLabel}>Capability:</span> Limited range, immediate impact
            </div>
            <div className={styles.aircraftTheater}>
              <span className={styles.theaterLabel}>Theater:</span> Emergency / tactical
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warningBox}>
        <p dangerouslySetInnerHTML={{ __html: content.fleetWarning }} />
      </div>

      <h3>Why All Five Are Required</h3>
      <p>{content.dependencyIntro}</p>
      <table>
        <thead>
          <tr>
            <th>If You Remove...</th>
            <th>What Happens</th>
          </tr>
        </thead>
        <tbody>
          {content.dependencies.map((dep, i) => (
            <tr key={i}>
              <td><strong>{dep.removed}</strong></td>
              <td>{dep.consequence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AccordionSection>
  );
}

function Act4(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].act4;
  
  return (
    <AccordionSection
      id="the-logistics-transformation"
      number={4}
      title={content.sectionTitle}
      owner="shared"
      executiveSummary={<p>{content.executiveSummary}</p>}
    >
      <h3>Enablement Multiplies, It Doesn't Overhead</h3>
      <p>
        The instinct is to see support functions as overhead—necessary costs that don't directly 
        produce value. This is ground-army thinking.
      </p>
      <p dangerouslySetInnerHTML={{ __html: content.enablementIntro }} />
      <div className={styles.multiplierDiagram}>
        <div className={styles.multiplierItem}>
          <div className={styles.multiplierValue}>{content.multiplier.input.value}</div>
          <div className={styles.multiplierLabel}>{content.multiplier.input.label}</div>
        </div>
        <div className={styles.multiplierArrow}>×</div>
        <div className={styles.multiplierItem}>
          <div className={styles.multiplierValue}>{content.multiplier.multiplierVal.value}</div>
          <div className={styles.multiplierLabel}>{content.multiplier.multiplierVal.label}</div>
        </div>
        <div className={styles.multiplierArrow}>=</div>
        <div className={styles.multiplierItem}>
          <div className={styles.multiplierValue}>{content.multiplier.output.value}</div>
          <div className={styles.multiplierLabel}>{content.multiplier.output.label}</div>
        </div>
      </div>
      <p>{content.leverageText}</p>
      <p dangerouslySetInnerHTML={{ __html: content.leverageConclusion }} />

      <h3>{content.platformSection.title}</h3>
      <p>{content.platformSection.intro}</p>
      <table>
        <thead>
          <tr>
            <th>{mode === 'airforce' ? 'Ad-hoc Logistics' : 'Platform Team'}</th>
            <th>{mode === 'airforce' ? 'Logistics Infrastructure' : 'Platform as Product'}</th>
          </tr>
        </thead>
        <tbody>
          {content.platformSection.comparison.map((row, i) => (
            <tr key={i}>
              <td>{row.left}</td>
              <td>{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: content.platformSection.conclusion }} />

      <h3>{content.investmentSection.title}</h3>
      <div className={styles.investmentBox}>
        <div className={styles.investmentHeader}>{content.investmentSection.header}</div>
        <div className={styles.investmentContent}>
          {content.investmentSection.rows.map((row, i) => (
            <div key={i} className={styles.investmentRow}>
              <span className={styles.investmentLabel}>{row.label}</span>
              <span className={styles.investmentValue}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: content.investmentSection.example }} />
      <p>{content.investmentSection.rationale}</p>

      <h3>The Triad: All Three Must Move Together</h3>
      <div className={styles.triadDiagram}>
        <div className={styles.triadNode}>
          <Icon name="users" className={styles.triadIcon} size={28} />
          <span className={styles.triadLabel}>People</span>
        </div>
        <div className={styles.triadNode}>
          <Icon name="gear" className={styles.triadIcon} size={28} />
          <span className={styles.triadLabel}>Process</span>
        </div>
        <div className={styles.triadNode}>
          <Icon name="laptop" className={styles.triadIcon} size={28} />
          <span className={styles.triadLabel}>Technology</span>
        </div>
        <div className={styles.triadCenter}>
          <span>{mode === 'airforce' ? 'Support' : 'RIC'}</span>
        </div>
      </div>
      <p>{content.triadIntro}</p>
      <ul>
        {content.triadItems.map((item, index) => (
          <li key={index}><strong>{item.label}:</strong> {item.desc}</li>
        ))}
      </ul>
    </AccordionSection>
  );
}

function Act5(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].act5;
  
  // Define ecosystem nodes based on mode
  const ecosystemNodes = mode === 'airforce' 
    ? {
        topRow: [
          { icon: 'chart' as IconName, name: 'Logistics', role: 'Sustainment' },
          { icon: 'rocket' as IconName, name: 'Support HQ', role: 'Coordination', isCenter: true },
          { icon: 'target' as IconName, name: 'Intelligence', role: 'Targeting' },
        ],
        bottomRow: [
          { icon: 'book' as IconName, name: 'Doctrine', role: 'Standards' },
          { icon: 'scales' as IconName, name: 'Command', role: 'Direction' },
          { icon: 'users' as IconName, name: 'Combat Units', role: 'Execution' },
        ],
      }
    : {
        topRow: [
          { icon: 'chart' as IconName, name: 'KATALYST', role: 'Platform' },
          { icon: 'rocket' as IconName, name: 'RIC', role: 'Enablement', isCenter: true },
          { icon: 'target' as IconName, name: 'PRIMA', role: 'Products' },
        ],
        bottomRow: [
          { icon: 'book' as IconName, name: 'FOE', role: 'Doctrine' },
          { icon: 'scales' as IconName, name: 'TRB', role: 'Governance' },
          { icon: 'users' as IconName, name: 'Delivery Teams', role: 'Execution' },
        ],
      };
  
  return (
    <AccordionSection
      id="combined-arms"
      number={5}
      title={content.sectionTitle}
      owner="shared"
      executiveSummary={<p>{content.executiveSummary}</p>}
    >
      <h3>{content.integrationTitle}</h3>
      <p>{content.integrationIntro}</p>
      <ul>
        {content.integrationItems.map((item, index) => (
          <li key={index}><strong>{item.label}</strong> {item.desc}</li>
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: content.combinedArmsExplainer }} />

      <h3>{content.ecosystemSection.title}</h3>
      <div className={styles.ecosystemDiagram}>
        <div className={styles.ecosystemRow}>
          {ecosystemNodes.topRow.map((node, i) => (
            <>
              {i > 0 && <div className={styles.ecosystemConnector}>↔</div>}
              <div className={`${styles.ecosystemNode} ${node.isCenter ? styles.ecosystemNodeRIC : ''}`} key={i}>
                <Icon name={node.icon} className={styles.ecosystemNodeIcon} size={24} />
                <span className={styles.ecosystemNodeName}>{node.name}</span>
                <span className={styles.ecosystemNodeRole}>{node.role}</span>
              </div>
            </>
          ))}
        </div>
        <div className={styles.ecosystemRow}>
          <div className={styles.ecosystemConnector}>↕</div>
          <div style={{ flex: 1 }} />
          <div className={styles.ecosystemConnector}>↕</div>
        </div>
        <div className={styles.ecosystemRow}>
          {ecosystemNodes.bottomRow.map((node, i) => (
            <>
              {i > 0 && <div className={styles.ecosystemConnector}>↔</div>}
              <div className={styles.ecosystemNode} key={i}>
                <Icon name={node.icon} className={styles.ecosystemNodeIcon} size={24} />
                <span className={styles.ecosystemNodeName}>{node.name}</span>
                <span className={styles.ecosystemNodeRole}>{node.role}</span>
              </div>
            </>
          ))}
        </div>
      </div>
      <p>{content.ecosystemSection.connectsIntro}</p>
      <ul>
        {content.ecosystemSection.connectsItems.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>

      <h3>{content.atcSection.title}</h3>
      <p>{content.atcSection.intro}</p>
      <ul>
        {content.atcSection.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <p>{content.atcSection.conclusion}</p>

      <h3>{content.isolationSection.title}</h3>
      <table>
        <thead>
          <tr>
            <th>Isolation Pattern</th>
            <th>Why It Fails</th>
          </tr>
        </thead>
        <tbody>
          {content.isolationSection.tableRows.map((row, i) => (
            <tr key={i}>
              <td>{row.pattern}</td>
              <td>{row.failure}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: content.isolationSection.conclusion }} />

      <h3>{content.virtuousCycleSection.title}</h3>
      <div className={styles.cycleDiagram}>
        {content.virtuousCycleSection.steps.map((step, i) => (
          <>
            {i > 0 && <div className={styles.cycleArrow}>{i < content.virtuousCycleSection.steps.length - 1 ? '→' : ''}</div>}
            <div className={styles.cycleStep} key={i}>
              <span className={styles.cycleNumber}>{i + 1}</span>
              <span className={styles.cycleLabel}>{step}</span>
            </div>
            {i === content.virtuousCycleSection.steps.length - 1 && <div className={styles.cycleArrow}>↩</div>}
          </>
        ))}
      </div>
      <p>{content.virtuousCycleSection.conclusion}</p>

      <h3>Power Projection: Deploying to Different Theaters</h3>
      <p dangerouslySetInnerHTML={{ __html: content.powerProjectionIntro }} />

      <div className={styles.powerProjection}>
        <div className={styles.projectionColumn}>
          <div className={styles.projectionHeader + ' ' + styles.projectionMature}>
            <Icon name="takeoff" className={styles.projectionIcon} size={24} />
            <span className={styles.projectionTitle}>{content.theaters.mature.title}</span>
          </div>
          <div className={styles.projectionContent}>
            <div className={styles.projectionCharacteristics}>
              <strong>Characteristics:</strong>
              <ul>
                {content.theaters.mature.characteristics.map((char, i) => (
                  <li key={i}>{char}</li>
                ))}
              </ul>
            </div>
            <div className={styles.projectionModel}>
              <strong>{content.engagementLabel}</strong>
              <p><em>{content.theaters.mature.engagementModel}</em></p>
              <p>{content.theaters.mature.engagementDesc}</p>
            </div>
            <div className={styles.projectionFleet}>
              <strong>{content.fleetLabel}</strong>
              <p>{content.theaters.mature.fleetAssets}</p>
            </div>
          </div>
        </div>

        <div className={styles.projectionColumn}>
          <div className={styles.projectionHeader + ' ' + styles.projectionDeveloping}>
            <Icon name="construction" className={styles.projectionIcon} size={24} />
            <span className={styles.projectionTitle}>{content.theaters.developing.title}</span>
          </div>
          <div className={styles.projectionContent}>
            <div className={styles.projectionCharacteristics}>
              <strong>Characteristics:</strong>
              <ul>
                {content.theaters.developing.characteristics.map((char, i) => (
                  <li key={i}>{char}</li>
                ))}
              </ul>
            </div>
            <div className={styles.projectionModel}>
              <strong>{content.engagementLabel}</strong>
              <p><em>{content.theaters.developing.engagementModel}</em></p>
              <p>{content.theaters.developing.engagementDesc}</p>
            </div>
            <div className={styles.projectionFleet}>
              <strong>{content.fleetLabel}</strong>
              <p>{content.theaters.developing.fleetAssets}</p>
            </div>
          </div>
        </div>

        <div className={styles.projectionColumn}>
          <div className={styles.projectionHeader + ' ' + styles.projectionAustere}>
            <Icon name="mountain" className={styles.projectionIcon} size={24} />
            <span className={styles.projectionTitle}>{content.theaters.austere.title}</span>
          </div>
          <div className={styles.projectionContent}>
            <div className={styles.projectionCharacteristics}>
              <strong>Characteristics:</strong>
              <ul>
                {content.theaters.austere.characteristics.map((char, i) => (
                  <li key={i}>{char}</li>
                ))}
              </ul>
            </div>
            <div className={styles.projectionModel}>
              <strong>{content.engagementLabel}</strong>
              <p><em>{content.theaters.austere.engagementModel}</em></p>
              <p>{content.theaters.austere.engagementDesc}</p>
            </div>
            <div className={styles.projectionFleet}>
              <strong>{content.fleetLabel}</strong>
              <p>{content.theaters.austere.fleetAssets}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.highlightBox}>
        <p dangerouslySetInnerHTML={{ __html: content.highlightBox.mainPoint }} />
        <p>{content.highlightBox.explanation}</p>
      </div>
    </AccordionSection>
  );
}

function Act6(): ReactNode {
  const { mode } = useViewMode();
  
  // Act 6 is eSimplicity-specific (team mappings, gap analysis, recommended actions)
  // It doesn't have a meaningful Air Force equivalent
  if (mode === 'airforce') {
    return null;
  }
  
  return (
    <AccordionSection
      id="the-path-forward"
      number={6}
      title="The Path Forward"
      owner="shared"
      executiveSummary={
        <p>
          Restructuring the RIC isn't about adding headcount or buying new tools. It's about 
          clearly defining mission sets and organizing existing resources to fill them. 
          Here's how the current teams map to the air power model.
        </p>
      }
    >
      <h3>Current Team Mapping</h3>
      <p>
        The existing RIC teams have natural affinities to different mission sets. The goal is 
        to clarify these mappings and ensure all five mission sets are covered:
      </p>

      <div className={styles.teamMappingGrid}>
        <div className={styles.teamCard}>
          <div className={styles.teamHeader}>
            <span className={styles.teamName}>Team 1: PRIMA</span>
          </div>
          <div className={styles.teamMissionSets}>
            <strong>Primary Mission Sets:</strong>
            <ul>
              <li><Icon name="takeoff" size={16} /> <strong>Delivery Enablement</strong> — Supporting teams using PRIMA</li>
              <li><Icon name="star" size={16} /> <strong>Reference Implementation</strong> — PRIMA itself as a showcase</li>
            </ul>
          </div>
          <div className={styles.teamNote}>
            PRIMA is both a product and a proof point. Team 1 enables delivery teams using 
            PRIMA while demonstrating what FOE-compliant development looks like.
          </div>
        </div>

        <div className={styles.teamCard}>
          <div className={styles.teamHeader}>
            <span className={styles.teamName}>Team 2: KATALYST</span>
          </div>
          <div className={styles.teamMissionSets}>
            <strong>Primary Mission Sets:</strong>
            <ul>
              <li><Icon name="microscope" size={16} /> <strong>Validation & Standards</strong> — Platform standards and testing</li>
              <li><Icon name="takeoff" size={16} /> <strong>Delivery Enablement</strong> — Platform support for delivery teams</li>
            </ul>
          </div>
          <div className={styles.teamNote}>
            KATALYST is the foundation everything runs on. Team 2 validates that the platform 
            meets standards and enables delivery teams to deploy safely.
          </div>
        </div>

        <div className={styles.teamCard + ' ' + styles.teamCardExpanded}>
          <div className={styles.teamHeader}>
            <span className={styles.teamName}>Team 3: Aaron</span>
            <span className={styles.teamBadge}>Expeditionary Lead</span>
          </div>
          <div className={styles.teamMissionSets}>
            <strong>Primary Mission Sets:</strong>
            <ul>
              <li><Icon name="target" size={16} /> <strong>Doctrine & Methods</strong> — FOE Field Guides, agentic patterns</li>
              <li><Icon name="star" size={16} /> <strong>Reference Implementation</strong> — FOE docs site as showcase</li>
              <li><Icon name="gamepad" size={16} /> <strong>Learning Labs</strong> — Experimentation and skill development</li>
              <li><Icon name="factory" size={16} /> <strong>Manufacturing & Expeditionary</strong> — Building tools AND deploying capability</li>
            </ul>
          </div>
          <div className={styles.expeditionaryRole}>
            <strong>Expeditionary Function:</strong>
            <p>
              Team 3 serves as the expeditionary force — deploying into contract environments 
              to establish FOE capability where it doesn't exist. This includes:
            </p>
            <ul>
              <li><strong>Theater Assessment</strong> — What aircraft can operate here? What infrastructure exists?</li>
              <li><strong>Infrastructure Building</strong> — Establishing the runway when none exists</li>
              <li><strong>Training Local Forces</strong> — Building delivery team capability to sustain operations</li>
              <li><strong>Fleet Manufacturing</strong> — Building the tools (rocket shop) that make all of this possible</li>
            </ul>
          </div>
          <div className={styles.teamNote}>
            Bridges BD needs with platform reality. But more than that — serves as the 
            forward-deployed capability that can project FOE into any theater, regardless 
            of existing infrastructure.
          </div>
        </div>
      </div>

      <h3>Gap Analysis</h3>
      <p>
        Looking at the mapping, some mission sets are well-covered while others need attention:
      </p>
      <table>
        <thead>
          <tr>
            <th>Mission Set</th>
            <th>Coverage</th>
            <th>Gap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><Icon name="microscope" size={16} /> Validation & Standards</td>
            <td className={styles.coveragePartial}>Partial (Team 2)</td>
            <td>Need explicit agent/tool validation process</td>
          </tr>
          <tr>
            <td><Icon name="target" size={16} /> Doctrine & Methods</td>
            <td className={styles.coverageGood}>Good (Team 3)</td>
            <td>Scale through train-the-trainer</td>
          </tr>
          <tr>
            <td><Icon name="star" size={16} /> Reference Implementation</td>
            <td className={styles.coverageGood}>Good (Teams 1 & 3)</td>
            <td>Make reference status explicit</td>
          </tr>
          <tr>
            <td><Icon name="takeoff" size={16} /> Delivery Enablement</td>
            <td className={styles.coveragePartial}>Partial (Teams 1 & 2)</td>
            <td>Need structured onboarding program</td>
          </tr>
          <tr>
            <td><Icon name="gamepad" size={16} /> Learning Labs</td>
            <td className={styles.coverageWeak}>Weak</td>
            <td>Need protected experimentation environments</td>
          </tr>
          <tr>
            <td><Icon name="factory" size={16} /> Manufacturing & Expeditionary</td>
            <td className={styles.coveragePartial}>Emerging (Team 3)</td>
            <td>Formalize expeditionary function; scale rocket shop</td>
          </tr>
        </tbody>
      </table>

      <h3>Recommended Actions</h3>
      <div className={styles.actionList}>
        <div className={styles.actionItem}>
          <div className={styles.actionNumber}>1</div>
          <div className={styles.actionContent}>
            <strong>Formalize the Five Mission Sets</strong>
            <p>
              Explicitly name and charter each mission set. Make clear who owns each and what 
              success looks like.
            </p>
          </div>
        </div>
        <div className={styles.actionItem}>
          <div className={styles.actionNumber}>2</div>
          <div className={styles.actionContent}>
            <strong>Establish Agent Validation Process</strong>
            <p>
              Create a "test program" function that validates agent configurations, prompts, 
              and patterns before they're approved for delivery team use.
            </p>
          </div>
        </div>
        <div className={styles.actionItem}>
          <div className={styles.actionNumber}>3</div>
          <div className={styles.actionContent}>
            <strong>Create Learning Lab Infrastructure</strong>
            <p>
              Establish sandbox environments and protected time for experimentation. 
              Implement blameless postmortem practice.
            </p>
          </div>
        </div>
        <div className={styles.actionItem}>
          <div className={styles.actionNumber}>4</div>
          <div className={styles.actionContent}>
            <strong>Build Delivery Team Onboarding</strong>
            <p>
              Structured program to bring delivery teams up to FOE standards. 
              Train-the-trainer approach for scale.
            </p>
          </div>
        </div>
        <div className={styles.actionItem}>
          <div className={styles.actionNumber}>5</div>
          <div className={styles.actionContent}>
            <strong>Designate Reference Implementations</strong>
            <p>
              Explicitly mark PRIMA, FOE docs site, and other projects as "Thunderbirds"—
              demonstrations of what disciplined excellence looks like.
            </p>
          </div>
        </div>
      </div>

      <h3>Success Metrics</h3>
      <p>How we'll know the restructuring is working:</p>
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>↑</span>
          <span className={styles.metricLabel}>Delivery Team Velocity</span>
          <span className={styles.metricDescription}>Teams using RIC enablement ship faster</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>↓</span>
          <span className={styles.metricLabel}>Time to Onboard</span>
          <span className={styles.metricDescription}>New teams reach productivity faster</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>↑</span>
          <span className={styles.metricLabel}>Pattern Reuse</span>
          <span className={styles.metricDescription}>Validated patterns used across projects</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>↓</span>
          <span className={styles.metricLabel}>Escalation Rate</span>
          <span className={styles.metricDescription}>Teams self-serve using RIC enablement</span>
        </div>
      </div>

      <h3>The Air We Need to Breathe</h3>
      <div className={styles.highlightBox}>
        <p>
          The air is the only place we can go at the speed that the new rocket engines need.
        </p>
        <p>
          AI agents are rocket engines. FOE is the flight envelope. KATALYST is the airframe. 
          But none of it matters without the organizational structure to fly.
        </p>
        <p>
          <strong>The RIC must become that structure.</strong>
        </p>
      </div>
    </AccordionSection>
  );
}

// ============================================
// CALL TO ACTION
// ============================================

function CTASection(): ReactNode {
  const { mode } = useViewMode();
  const content = modeContent[mode].cta;
  
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{content.title}</h2>
        <p className={styles.ctaDescription}>{content.description}</p>
        <div className={styles.ctaQuote}>{content.quote}</div>
      </div>
    </section>
  );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default function RICAirPower(): ReactNode {
  const [mode, setMode] = useState<ViewMode>('airforce');

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      <Layout
        title="RIC Air Power Strategy"
        description="Why agentic speed requires air power organization"
      >
        <main className={styles.strategyPage}>
          <HeroSection />
          <div className={styles.pageWrapper}>
            <StrategySidebar sections={sections} topContent={<ModeToggle />} />
            <div className={styles.mainContent}>
              <div className={styles.sectionsContainer}>
                <Act1 />
                <Act2 />
                <Act3 />
                <Act4 />
                <Act5 />
                <Act6 />
              </div>
            </div>
          </div>
          <CTASection />
        </main>
      </Layout>
    </ViewModeContext.Provider>
  );
}
