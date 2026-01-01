import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';

interface WaitlistConfirmationEmailProps {
  name: string;
  registeredDate: string;
}

export default function WaitlistConfirmationEmail({
  name,
  registeredDate,
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={h1}>대기명단 등록 완료</Heading>
            <Hr style={hr} />
            <Text style={text}>
              안녕하세요, <strong>{name}</strong>님!
            </Text>
            <Text style={text}>
              NTSS Di Me 얼리버드 대기명단에 성공적으로 등록되었습니다.
            </Text>

            <Section style={confirmBox}>
              <Text style={confirmLabel}>등록 완료</Text>
              <Heading style={confirmIcon}>✓</Heading>
            </Section>

            <Text style={text}>등록 일시: {registeredDate}</Text>

            <Hr style={hr} />

            <Text style={text}>
              서비스 오픈 시 특별 혜택과 함께 우선적으로 안내해 드리겠습니다.
            </Text>
            <Text style={footer}>
              이메일은 안전하게 보관되며, 마케팅 용도로만 사용됩니다.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const h1 = {
  color: '#a60202',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
};

const confirmBox = {
  backgroundColor: '#a60202',
  borderRadius: '4px',
  margin: '32px 0',
  padding: '32px',
  textAlign: 'center' as const,
};

const confirmLabel = {
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '1px',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  opacity: 0.7,
};

const confirmIcon = {
  color: '#fff',
  fontSize: '48px',
  fontWeight: 'bold',
  margin: '8px 0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '32px',
};
