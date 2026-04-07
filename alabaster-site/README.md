# Alabaster ADU Solutions — Landing Page

## 프로젝트 개요
워싱턴주 ADU(Accessory Dwelling Unit) 전문 컨설팅 랜딩 페이지.  
부지 검토, 금융 구조, 허가, 시공 안내를 원스탑으로 제공하며 한국어/영어 이중 언어를 완전 지원합니다.

**라이브 URL:** https://30c7ce3a-f794-4938-a8de-4d041faf63a6.vip.gensparksite.com  
---

## ✅ 완료된 기능

### 메인 페이지 (index.html)
- **헤더/내비게이션** — 스티키 헤더, 스크롤 시 배경 전환, 모바일 햄버거 메뉴
- **한국어 / English 언어 토글** — 헤더 우측 버튼, 모바일 메뉴 내 버튼
  - `data-i18n` / `data-i18n-html` 속성 방식으로 모든 텍스트 교체
  - localStorage에 언어 선택 저장 (재방문 시 유지)
  - 페이지 title, html lang 속성도 자동 변경
- **Hero 섹션** — 이미지, 6단계 프로세스 카드, CTA 버튼
- **ADU란?** — 6가지 특징 카드
- **왜 지금 ADU?** — 4가지 이유 카드
- **워싱턴주 법령** — 6가지 변화 항목 (클릭 액티브)
- **ADU 유형** — 6가지 유형 이미지 카드 (Detached, Attached, Garage Conversion, Basement, Above Garage, Addition)
- **활용 시나리오** — 5가지 활용 유형 카드
- **6단계 진행 절차** — Navy 배경 섹션
- **준비 체크리스트** — 10개 항목 인터랙티브 체크박스
- **서비스** — 5가지 서비스 카드
- **FAQ** — 7개 아코디언 질문
- **무료 상담 CTA** — 상담 신청 / 전화 / 이메일 버튼
- **푸터** — 연락처, 사이트맵, 법적 링크
- **상담 신청 모달** — 8개 필드 폼, Google Apps Script 연동
- **스크롤 진행바** — 상단 그라데이션 바
- **스크롤 리빌 애니메이션** — IntersectionObserver 기반

## 📁 파일 구조
``` 
index.html          메인 랜딩 페이지 (한/영 이중 언어)
css/
  style.css         전체 스타일시트
js/                 (JavaScript는 HTML 내 인라인 처리)
images/
  hero-adu-new.jpg  히어로 이미지
  type-detached.jpg
  type-attached.jpg
  type-garage.jpg
  type-basement.jpg
  type-above-garage.jpg
  type-addition.jpg
```

---

## 🌐 언어 전환 시스템

### 구조
- HTML 텍스트 요소에 `data-i18n="key"` 또는 `data-i18n-html="key"` 속성 부여
- JavaScript `TRANSLATIONS` 객체에 한국어(`ko`) / 영어(`en`) 번역 사전 내장
- `applyLanguage(lang)` 함수가 모든 `[data-i18n]` 요소를 일괄 교체

### 버튼 위치
- 헤더 우측: `한국어 | English` 버튼 (데스크탑)
- 모바일 메뉴 상단: 동일 버튼

### 번역 키 규칙
| 접두어 | 섹션 |
|---|---|
| `nav.*` | 내비게이션 |
| `hero.*` | 히어로 |
| `about.*`, `feat*` | ADU란? |
| `why*` | 왜 지금? |
| `law*` | 워싱턴주 법령 |
| `types.*`, `type*` | ADU 유형 |
| `use*` | 활용 시나리오 |
| `proc*` | 진행 절차 |
| `chk*` | 체크리스트 |
| `svc*` | 서비스 |
| `faq*` | FAQ |
| `cta.*` | CTA 섹션 |
| `footer.*` | 푸터 |
| `modal.*` | 상담 모달 |

---

## 🗄️ 문의 데이터 처리

- 상담 폼은 Google Apps Script 웹앱으로 전송됩니다.
- 접수 데이터는 Google Sheets에 저장됩니다.
- 관리자 확인은 Google Sheets 또는 로컬 전용 관리자 파일에서 진행하는 것을 권장합니다.

---

## 🔧 다음 개선 제안
- [ ] 관리자용 별도 비공개 대시보드 구축
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 메타 태그 SEO 강화 (lang별 hreflang)
- [ ] Google Analytics 연동
- [ ] 상담 접수 후 자동 이메일 알림

---

## 연락처
- 전화: (206) 512-0959  
- 이메일: contact@alabaster.llc  
- 주소: 2412 1st Ave S, Seattle, WA 98134
