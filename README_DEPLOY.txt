Korean-Lao General Conversation G1.0.0-alpha1

목적
- 새 GitHub Pages 저장소 korean-lao-general 전용 첫 테스트 빌드
- 기존 부부앱 V3.61.95는 수정하지 않음
- 현재 단계는 UI + 한국어/라오어 화자전환 구조만 검증

업로드 파일
1. index.html
2. diagnostic.html
3. version.json

GitHub repository 루트에 세 파일을 업로드하면 됩니다.

현재 의도적으로 미연결
- Gemini 번역
- 역번역
- Google Chirp 3 STT
- Azure TTS
- Cloud Run / Cloudflare 인증
- telemetry / Firestore

다음 단계
G1.0.0-alpha2: 일반대화 전용 텍스트 번역 + 역번역 정책 연결
그 후 STT/TTS를 단계별로 연결

보안
- 이 패키지에는 Gemini key, Azure key, relay token 등 실제 비밀값이 들어 있지 않습니다.
