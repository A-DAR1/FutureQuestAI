import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type Screen = 'welcome' | 'quiz' | 'avatar' | 'worlds' | 'quests' | 'chat' | 'parent';
type AnswerMap = Record<number, string>;

type Message = {
  from: 'student' | 'ai';
  text: string;
};

const screens: Screen[] = ['welcome', 'quiz', 'avatar', 'worlds', 'quests', 'chat', 'parent'];

const quiz = [
  {
    question: 'Which activity sounds most fun after school?',
    options: ['Debating an issue', 'Building an app', 'Designing a poster', 'Helping a friend', 'Selling an idea'],
  },
  {
    question: 'What do people usually come to you for?',
    options: ['Advice', 'Explaining things', 'Creative ideas', 'Solving problems', 'Confidence boost'],
  },
  {
    question: 'Which future world do you want to test first?',
    options: ['Business', 'Law & Policy', 'Tech', 'Psychology', 'Media'],
  },
  {
    question: 'What worries you most right now?',
    options: ['Choosing stream', 'Parents expectations', 'Low confidence', 'No exposure', 'College confusion'],
  },
];

const careerWorlds = [
  { icon: '⚖️', title: 'Law & Policy', tag: 'Debate, justice, public speaking', xp: '+80 XP' },
  { icon: '💼', title: 'Business', tag: 'Entrepreneurship, sales, strategy', xp: '+70 XP' },
  { icon: '💻', title: 'Tech', tag: 'Apps, AI, coding, product', xp: '+90 XP' },
  { icon: '🎨', title: 'Design & Media', tag: 'Content, branding, storytelling', xp: '+65 XP' },
  { icon: '🧠', title: 'Psychology', tag: 'People, behavior, listening', xp: '+75 XP' },
  { icon: '🔬', title: 'Science & Research', tag: 'Experiments, data, discovery', xp: '+85 XP' },
];

const quests = [
  {
    title: 'Debate Quest',
    desc: 'Record a 60-second argument: Should phones be allowed in school?',
    skill: 'Communication',
    reward: '+50 XP',
    status: 'Today',
  },
  {
    title: 'Mini Internship DM',
    desc: 'Write a cold message asking a founder for a 2-week shadow internship.',
    skill: 'Initiative',
    reward: '+80 XP',
    status: 'Next',
  },
  {
    title: 'Parent Explainer',
    desc: 'Explain one career option to a parent in simple language.',
    skill: 'Clarity',
    reward: '+60 XP',
    status: 'Weekly',
  },
];

const quickPrompts = [
  'I am confused between commerce and humanities.',
  'How do I convince my parents?',
  'Give me a quest for law.',
  'How can I get an internship in Class 10?',
];

function getAvatar(answers: AnswerMap) {
  const text = Object.values(answers).join(' ').toLowerCase();

  if (text.includes('building') || text.includes('tech') || text.includes('solving')) {
    return {
      name: 'Builder-Analyst',
      emoji: '🛠️',
      line: 'You like solving problems, making systems, and testing how things work.',
      paths: ['Tech', 'Product', 'Engineering', 'Data', 'Entrepreneurship'],
      skills: ['Logic', 'Curiosity', 'Problem solving'],
      growth: 'Practice communication and real-world project building.',
    };
  }

  if (text.includes('helping') || text.includes('psychology') || text.includes('advice')) {
    return {
      name: 'People Decoder',
      emoji: '🧠',
      line: 'You are drawn to people, emotions, behavior, and meaningful conversations.',
      paths: ['Psychology', 'HR', 'Law', 'Education', 'Social Impact'],
      skills: ['Empathy', 'Listening', 'Reflection'],
      growth: 'Build structure, research habits, and public confidence.',
    };
  }

  return {
    name: 'Persuader-Creator',
    emoji: '🚀',
    line: 'You enjoy ideas, expression, people, and convincing others through stories.',
    paths: ['Law', 'Marketing', 'Media', 'Business', 'Liberal Arts'],
    skills: ['Communication', 'Storytelling', 'Confidence'],
    growth: 'Build consistency, evidence-based thinking, and execution discipline.',
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWorld, setSelectedWorld] = useState('Law & Policy');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'ai',
      text: 'Hey Aarav 👋 I am your FutureQuest companion. Ask me anything about streams, careers, parents, colleges, or internships. I will turn confusion into quests.',
    },
  ]);

  const avatar = useMemo(() => getAvatar(answers), [answers]);
  const progress = Math.round((Object.keys(answers).length / quiz.length) * 100);

  const go = (target: Screen) => setScreen(target);
  const nextIndex = Math.min(screens.indexOf(screen) + 1, screens.length - 1);
  const prevIndex = Math.max(screens.indexOf(screen) - 1, 0);

  const chooseAnswer = (option: string) => {
    const nextAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(nextAnswers);

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen('avatar');
    }
  };

  const aiReply = (raw: string) => {
    const text = raw.toLowerCase();

    if (text.includes('commerce') || text.includes('humanities') || text.includes('science') || text.includes('stream')) {
      return 'Do not choose only based on marks or friends. This week, test both paths: complete one Business Quest, one Debate Quest, and one Writing Quest. I will update your Future Avatar based on what you actually enjoy doing.';
    }

    if (text.includes('parent') || text.includes('convince')) {
      return 'Use evidence, not emotion. Tell them: “I am not rejecting safe careers. I am testing options through weekly quests and building a portfolio.” Want me to create a parent-friendly explanation?';
    }

    if (text.includes('internship')) {
      return 'For Class 10, think shadow internship, not corporate internship. Start with local businesses, NGOs, creators, school alumni, and family networks. Quest: send 3 respectful messages this week. I can draft one for you.';
    }

    if (text.includes('law')) {
      return 'Law is not just memorizing acts. It needs argument, reading, writing, logic, and confidence. Try this quest: argue both sides of “Should school uniforms be compulsory?” in 90 seconds.';
    }

    return 'Good question. I will convert that into a small experiment instead of giving a random answer. Your next step: do one 20-minute quest, reflect on whether it energized or drained you, and add the result to your portfolio.';
  };

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { from: 'student', text: trimmed },
      { from: 'ai', text: aiReply(trimmed) },
    ]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" />
      <View style={styles.phoneShell}>
        <Header screen={screen} onNav={go} />

        {screen === 'welcome' && (
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.heroCard}>
              <Text style={styles.badge}>AI Companion Prototype</Text>
              <Text style={styles.heroTitle}>FutureQuest AI</Text>
              <Text style={styles.heroSubtitle}>
                Turn career confusion into weekly quests, future avatars, parent clarity, and a real student portfolio.
              </Text>
              <View style={styles.demoStudentCard}>
                <Text style={styles.studentEmoji}>🎒</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Demo student: Aarav</Text>
                  <Text style={styles.muted}>Class 10 • confused between Science, Commerce & Humanities</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={() => go('quiz')}>
                <Text style={styles.primaryButtonText}>Start future scan</Text>
              </TouchableOpacity>
            </View>

            <SectionTitle eyebrow="What the prototype proves" title="Not a counselling test. A growth loop." />
            <View style={styles.gridTwo}>
              <MiniCard icon="🧭" title="Discover" body="AI finds interests through playful questions." />
              <MiniCard icon="🎮" title="Quest" body="Students test careers through real actions." />
              <MiniCard icon="👨‍👩‍👧" title="Explain" body="Parents get simple progress reports." />
              <MiniCard icon="🏆" title="Portfolio" body="Every quest becomes proof of growth." />
            </View>
          </ScrollView>
        )}

        {screen === 'quiz' && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Future Scan</Text>
            <Text style={styles.screenSubtitle}>Answer like Aarav. The AI will create a future avatar.</Text>
            <View style={styles.progressOuter}>
              <View style={[styles.progressInner, { width: `${Math.max(progress, 8)}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% complete</Text>

            <View style={styles.questionCard}>
              <Text style={styles.questionCount}>Question {currentQuestion + 1} of {quiz.length}</Text>
              <Text style={styles.questionText}>{quiz[currentQuestion].question}</Text>
              {quiz[currentQuestion].options.map((option) => (
                <TouchableOpacity key={option} style={styles.option} onPress={() => chooseAnswer(option)}>
                  <Text style={styles.optionText}>{option}</Text>
                  <Text style={styles.optionArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {screen === 'avatar' && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Your Future Avatar</Text>
            <Text style={styles.screenSubtitle}>This is not a final career decision. It is the first identity to test.</Text>

            <View style={styles.avatarCard}>
              <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
              <Text style={styles.avatarName}>{avatar.name}</Text>
              <Text style={styles.avatarLine}>{avatar.line}</Text>
              <Text style={styles.smallHeading}>Possible paths</Text>
              <View style={styles.chipWrap}>
                {avatar.paths.map((path) => <Chip key={path} text={path} />)}
              </View>
              <Text style={styles.smallHeading}>Natural strengths</Text>
              <View style={styles.chipWrap}>
                {avatar.skills.map((skill) => <Chip key={skill} text={skill} soft />)}
              </View>
              <View style={styles.growthBox}>
                <Text style={styles.growthLabel}>Growth edge</Text>
                <Text style={styles.growthText}>{avatar.growth}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => go('worlds')}>
              <Text style={styles.primaryButtonText}>Explore career worlds</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {screen === 'worlds' && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Career Worlds</Text>
            <Text style={styles.screenSubtitle}>Try careers like game worlds before choosing a stream.</Text>

            {careerWorlds.map((world) => (
              <TouchableOpacity
                key={world.title}
                style={[styles.worldCard, selectedWorld === world.title && styles.worldCardActive]}
                onPress={() => setSelectedWorld(world.title)}
              >
                <Text style={styles.worldIcon}>{world.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.worldTitle}>{world.title}</Text>
                  <Text style={styles.worldTag}>{world.tag}</Text>
                </View>
                <Text style={styles.worldXp}>{world.xp}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.selectedBox}>
              <Text style={styles.smallHeadingLight}>Selected world</Text>
              <Text style={styles.selectedWorld}>{selectedWorld}</Text>
              <Text style={styles.muted}>Next: start a mini quest to test whether this world feels energizing.</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => go('quests')}>
              <Text style={styles.primaryButtonText}>Start weekly quests</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {screen === 'quests' && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Quest Dashboard</Text>
            <Text style={styles.screenSubtitle}>Aarav is Level 3. This week is about testing communication-heavy careers.</Text>

            <View style={styles.statsRow}>
              <Stat label="Level" value="3" />
              <Stat label="XP" value="420" />
              <Stat label="Streak" value="5d" />
            </View>

            <View style={styles.portfolioCard}>
              <View>
                <Text style={styles.cardTitle}>Portfolio readiness</Text>
                <Text style={styles.muted}>3 projects • 2 reflections • 1 parent discussion</Text>
              </View>
              <Text style={styles.portfolioScore}>38%</Text>
            </View>

            {quests.map((quest, index) => (
              <View key={quest.title} style={styles.questCard}>
                <View style={styles.questTopRow}>
                  <Text style={styles.questStatus}>{quest.status}</Text>
                  <Text style={styles.questReward}>{quest.reward}</Text>
                </View>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDesc}>{quest.desc}</Text>
                <View style={styles.questFooter}>
                  <Text style={styles.skillPill}>{quest.skill}</Text>
                  <TouchableOpacity style={styles.smallButton} onPress={() => index === 0 ? go('chat') : go('quests')}>
                    <Text style={styles.smallButtonText}>{index === 0 ? 'Ask AI for help' : 'Preview'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.secondaryButton} onPress={() => go('chat')}>
              <Text style={styles.secondaryButtonText}>Open AI companion</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {screen === 'chat' && (
          <View style={styles.chatScreen}>
            <ScrollView contentContainerStyle={styles.chatContent}>
              <View style={styles.aiIntroCard}>
                <Text style={styles.badgeDark}>Simulated AI Mentor</Text>
                <Text style={styles.cardTitleDark}>Ask about streams, parents, internships, or quests.</Text>
              </View>

              {messages.map((message, index) => (
                <View key={`${message.from}-${index}`} style={[styles.messageBubble, message.from === 'student' ? styles.studentBubble : styles.aiBubble]}>
                  <Text style={[styles.messageText, message.from === 'student' ? styles.studentMessageText : styles.aiMessageText]}>{message.text}</Text>
                </View>
              ))}

              <View style={styles.promptWrap}>
                {quickPrompts.map((prompt) => (
                  <TouchableOpacity key={prompt} style={styles.promptChip} onPress={() => sendMessage(prompt)}>
                    <Text style={styles.promptText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.inputBar}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask FutureQuest..."
                placeholderTextColor="#8E90A6"
              />
              <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screen === 'parent' && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Parent Report</Text>
            <Text style={styles.screenSubtitle}>Simple, trust-building explanation for family decisions.</Text>

            <View style={styles.reportCard}>
              <Text style={styles.reportTitle}>Aarav’s monthly signal</Text>
              <Text style={styles.reportBig}>Persuader-Creator</Text>
              <Text style={styles.reportBody}>
                Aarav is repeatedly choosing communication, debate, business, and media quests. He shows interest in law, marketing, entrepreneurship, and liberal arts.
              </Text>
            </View>

            <View style={styles.reportCardLight}>
              <Text style={styles.smallHeading}>Completed this month</Text>
              <ReportRow label="Communication quests" value="4" />
              <ReportRow label="Career worlds explored" value="3" />
              <ReportRow label="Portfolio tasks" value="3" />
              <ReportRow label="Reflection quality" value="Good" />
            </View>

            <View style={styles.reportCardLight}>
              <Text style={styles.smallHeading}>Suggested parent conversation</Text>
              <Text style={styles.reportBodyDark}>
                Instead of asking “Science or Commerce?”, ask: “Which problems felt exciting to solve this month?”
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => go('welcome')}>
              <Text style={styles.primaryButtonText}>Restart demo</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {screen !== 'welcome' && (
          <View style={styles.bottomNav}>
            <TouchableOpacity onPress={() => setScreen(screens[prevIndex])} style={styles.navButton}>
              <Text style={styles.navButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen(screens[nextIndex])} style={styles.navButtonPrimary}>
              <Text style={styles.navButtonPrimaryText}>Next →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function Header({ screen, onNav }: { screen: Screen; onNav: (screen: Screen) => void }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => onNav('welcome')}>
        <Text style={styles.logo}>FQ</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>FutureQuest AI</Text>
        <Text style={styles.headerSubtitle}>{screen === 'chat' ? 'AI mentor mode' : 'Student growth companion'}</Text>
      </View>
      <TouchableOpacity style={styles.parentButton} onPress={() => onNav('parent')}>
        <Text style={styles.parentButtonText}>Parent</Text>
      </TouchableOpacity>
    </View>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionHeading}>{title}</Text>
    </View>
  );
}

function MiniCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniIcon}>{icon}</Text>
      <Text style={styles.miniTitle}>{title}</Text>
      <Text style={styles.miniBody}>{body}</Text>
    </View>
  );
}

function Chip({ text, soft = false }: { text: string; soft?: boolean }) {
  return (
    <View style={[styles.chip, soft && styles.chipSoft]}>
      <Text style={[styles.chipText, soft && styles.chipSoftText]}>{text}</Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.reportRow}>
      <Text style={styles.reportRowLabel}>{label}</Text>
      <Text style={styles.reportRowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1028',
  },
  phoneShell: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  header: {
    backgroundColor: '#0F1028',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#7C5CFF',
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 42,
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 17,
  },
  headerSubtitle: {
    color: '#B7B8D9',
    marginTop: 2,
    fontSize: 12,
  },
  parentButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  parentButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  content: {
    padding: 18,
    paddingBottom: 110,
  },
  heroCard: {
    backgroundColor: '#17183B',
    borderRadius: 30,
    padding: 24,
    marginBottom: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    color: '#CBFF7A',
    backgroundColor: 'rgba(203,255,122,0.13)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 99,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 18,
  },
  badgeDark: {
    alignSelf: 'flex-start',
    color: '#3F2DA8',
    backgroundColor: '#EBE7FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 99,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 39,
    fontWeight: '900',
    letterSpacing: -1,
  },
  heroSubtitle: {
    color: '#DDDFFF',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
  },
  demoStudentCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    borderRadius: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 20,
  },
  studentEmoji: {
    fontSize: 34,
  },
  primaryButton: {
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E4E5F3',
  },
  secondaryButtonText: {
    color: '#221B60',
    fontWeight: '900',
    fontSize: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  eyebrow: {
    color: '#7C5CFF',
    fontWeight: '900',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 1,
  },
  sectionHeading: {
    fontSize: 22,
    color: '#181A31',
    fontWeight: '900',
    marginTop: 3,
  },
  gridTwo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  miniCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEBF4',
  },
  miniIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  miniTitle: {
    color: '#17183B',
    fontWeight: '900',
    fontSize: 15,
  },
  miniBody: {
    color: '#6E7087',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  screenTitle: {
    color: '#15172E',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  screenSubtitle: {
    color: '#666A83',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  progressOuter: {
    height: 12,
    borderRadius: 99,
    backgroundColor: '#E5E6F0',
    overflow: 'hidden',
  },
  progressInner: {
    height: 12,
    borderRadius: 99,
    backgroundColor: '#7C5CFF',
  },
  progressText: {
    color: '#7C5CFF',
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EAEBF4',
  },
  questionCount: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 12,
    marginBottom: 10,
  },
  questionText: {
    color: '#15172E',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    marginBottom: 18,
  },
  option: {
    backgroundColor: '#F6F7FB',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ECEEF7',
  },
  optionText: {
    color: '#20223B',
    fontWeight: '800',
    flex: 1,
  },
  optionArrow: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 18,
  },
  avatarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: '#EAEBF4',
  },
  avatarEmoji: {
    fontSize: 52,
    marginBottom: 4,
  },
  avatarName: {
    color: '#15172E',
    fontSize: 30,
    fontWeight: '900',
  },
  avatarLine: {
    color: '#5E6179',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 16,
  },
  smallHeading: {
    color: '#20223B',
    fontWeight: '900',
    fontSize: 15,
    marginBottom: 10,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#17183B',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  chipSoft: {
    backgroundColor: '#EEF0FF',
  },
  chipSoftText: {
    color: '#3F2DA8',
  },
  growthBox: {
    backgroundColor: '#F5F2FF',
    borderRadius: 20,
    padding: 15,
  },
  growthLabel: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  growthText: {
    color: '#232446',
    fontWeight: '700',
    lineHeight: 20,
  },
  worldCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEBF4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  worldCardActive: {
    borderColor: '#7C5CFF',
    backgroundColor: '#F3F0FF',
  },
  worldIcon: {
    fontSize: 31,
  },
  worldTitle: {
    color: '#17183B',
    fontWeight: '900',
    fontSize: 17,
  },
  worldTag: {
    color: '#6C7088',
    marginTop: 4,
    fontSize: 12,
  },
  worldXp: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 12,
  },
  selectedBox: {
    backgroundColor: '#17183B',
    borderRadius: 24,
    padding: 18,
    marginTop: 8,
  },
  selectedWorld: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  muted: {
    color: '#989BB0',
    fontSize: 13,
    lineHeight: 19,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  cardTitleDark: {
    color: '#17183B',
    fontWeight: '900',
    fontSize: 16,
  },
  smallHeadingLight: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEBF4',
  },
  statValue: {
    color: '#7C5CFF',
    fontWeight: '900',
    fontSize: 24,
  },
  statLabel: {
    color: '#777A90',
    fontWeight: '700',
    marginTop: 3,
    fontSize: 12,
  },
  portfolioCard: {
    backgroundColor: '#17183B',
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portfolioScore: {
    color: '#CBFF7A',
    fontWeight: '900',
    fontSize: 26,
  },
  questCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 17,
    borderWidth: 1,
    borderColor: '#EAEBF4',
    marginBottom: 12,
  },
  questTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  questStatus: {
    color: '#7C5CFF',
    backgroundColor: '#EFEAFF',
    overflow: 'hidden',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '900',
    fontSize: 12,
  },
  questReward: {
    color: '#12A36A',
    fontWeight: '900',
    fontSize: 13,
  },
  questTitle: {
    color: '#15172E',
    fontWeight: '900',
    fontSize: 20,
  },
  questDesc: {
    color: '#60637A',
    lineHeight: 21,
    fontSize: 14,
    marginTop: 6,
  },
  questFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  skillPill: {
    color: '#22244A',
    backgroundColor: '#F0F1F7',
    overflow: 'hidden',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontWeight: '800',
    fontSize: 12,
  },
  smallButton: {
    backgroundColor: '#17183B',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  smallButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  chatScreen: {
    flex: 1,
  },
  chatContent: {
    padding: 18,
    paddingBottom: 22,
  },
  aiIntroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEBF4',
  },
  messageBubble: {
    maxWidth: '86%',
    borderRadius: 22,
    padding: 14,
    marginBottom: 10,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEBF4',
    borderBottomLeftRadius: 8,
  },
  studentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7C5CFF',
    borderBottomRightRadius: 8,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  aiMessageText: {
    color: '#24263E',
  },
  studentMessageText: {
    color: '#FFFFFF',
  },
  promptWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  promptChip: {
    backgroundColor: '#EDEAFF',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  promptText: {
    color: '#4F39C5',
    fontWeight: '800',
    fontSize: 12,
  },
  inputBar: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E6F0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4FA',
    borderRadius: 18,
    paddingHorizontal: 14,
    color: '#191A2E',
    fontWeight: '700',
  },
  sendButton: {
    backgroundColor: '#7C5CFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  reportCard: {
    backgroundColor: '#17183B',
    borderRadius: 28,
    padding: 22,
    marginBottom: 14,
  },
  reportTitle: {
    color: '#BFC1E8',
    fontWeight: '800',
    marginBottom: 10,
  },
  reportBig: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 10,
  },
  reportBody: {
    color: '#DDDEFF',
    lineHeight: 22,
    fontWeight: '600',
  },
  reportCardLight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAEBF4',
    marginBottom: 14,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F7',
  },
  reportRowLabel: {
    color: '#6C7088',
    fontWeight: '700',
  },
  reportRowValue: {
    color: '#17183B',
    fontWeight: '900',
  },
  reportBodyDark: {
    color: '#282A45',
    lineHeight: 22,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E6F0',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#F2F3F8',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#3F415C',
    fontWeight: '900',
  },
  navButtonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#17183B',
    alignItems: 'center',
  },
  navButtonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
