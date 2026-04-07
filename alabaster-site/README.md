# Alabaster ADU Solutions — Landing Page

## 프로젝트 개요
워싱턴주 ADU(Accessory Dwelling Unit) 전문 컨설팅 랜딩 페이지.  
부지 검토, 금융 구조, 허가, 시공 안내를 원스탑으로 제공하며 한국어/영어 이중 언어를 완전 지원합니다.

**라이브 URL:** https://30c7ce3a-f794-4938-a8de-4d041faf63a6.vip.gensparksite.com  
**관리자 페이지:** https://30c7ce3a-f794-4938-a8de-4d041faf63a6.vip.gensparksite.com/admin.html

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
- **푸터** — 연락처, 사이트맵, 법적 링크, 관리자 링크
- **상담 신청 모달** — 8개 필드 폼, API 연동 (tables/consultation_requests)
- **스크롤 진행바** — 상단 그라데이션 바
- **스크롤 리빌 애니메이션** — IntersectionObserver 기반

### 관리자 페이지 (admin.html)
- **로그인** — ID: admin / PW: 1234 (클라이언트 사이드)
- **대시보드 카드** — 총 문의, 오늘 문의, 융자 관심, 주요 ADU 유형
- **문의 테이블** — 전체 상담 데이터 표시
- **검색/필터** — 이름·이메일·주소 검색, ADU 유형·융자 관심 필터
- **정렬** — 접수시간, 이름, ADU 유형 (오름/내림차순)
- **상세 모달** — 👁️ 버튼으로 상세 정보 보기 및 삭제
- **CSV 내보내기** — 현재 필터 기준 Excel 호환 CSV
- **60초 자동 새로고침**

---

## 📁 파일 구조
```
index.html          메인 랜딩 페이지 (한/영 이중 언어)
admin.html          관리자 대시보드
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

## 🗄️ 데이터 모델

### consultation_requests 테이블
| 필드 | 타입 | 설명 |
|---|---|---|
| id | text | UUID (자동) |
| name | text | 이름 |
| phone | text | 연락처 |
| email | text | 이메일 |
| address | text | 부지 주소 |
| aduType | text | ADU 유형 |
| budget | text | 예산 범위 |
| financing | text | 융자 관심 여부 |
| message | text | 추가 문의 |
| submittedAt | text | 제출 시각 (ISO) |
| created_at | datetime | 자동 생성 |

**API 엔드포인트:**  
`POST tables/consultation_requests` — 신규 문의 등록  
`GET tables/consultation_requests` — 전체 목록 조회  
`DELETE tables/consultation_requests/{id}` — 삭제

---

## 🔧 다음 개선 제안
- [ ] 관리자 페이지 서버 사이드 인증 (현재 클라이언트 사이드만)
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 메타 태그 SEO 강화 (lang별 hreflang)
- [ ] Google Analytics 연동
- [ ] 상담 접수 후 자동 이메일 알림

---

## 연락처
- 전화: (206) 512-0959  
- 이메일: contact@alabaster.llc  
- 주소: 2412 1st Ave S, Seattle, WA 98134
