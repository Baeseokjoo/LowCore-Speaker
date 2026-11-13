import s02Pc from '../assets/s02/s02-pc.png';
import s02Five from '../assets/s02/s02-5inch.png';
import s02Eight from '../assets/s02/s02-8inch.png';
import s04Five from '../assets/s04-5inch.png';
import s04Eight from '../assets/s04-8inch.png';

// M01 상단 메뉴 · 푸터 섹션 바로가기 (2026-11-13 확정). 섹션 라벨도 같은 이름을 씀
export const NAV_ITEMS = [
  { id: 's02', label: 'Experience' },
  { id: 's03', label: 'Why' },
  { id: 's04', label: 'Model' },
];

// S02 비교 기기. size = 이미지 칸 높이 대비 비율(크기 순서 단계), cutoff = 저음 필터 기준 주파수(Hz)
export const DEVICES = [
  { id: 'pc', label: 'PC 스피커', ariaLabel: 'PC 스피커 선택', image: s02Pc, size: 0.6, cutoff: 150 },
  { id: '5', label: 'LC-5-105', ariaLabel: 'LC-5-105 (5인치) 선택', image: s02Five, size: 0.7, cutoff: 60 },
  { id: '8', label: 'LC-8-112', ariaLabel: 'LC-8-112 (8인치) 선택', image: s02Eight, size: 0.8, cutoff: 25 },
];

// S04 모델
export const MODELS = {
  5: {
    id: '5',
    name: 'LC-5-105',
    image: s04Five,
    size: 0.7,
    summary: ['작은 작업 공간 및 데스크 환경', '공간 효율적인 크기', '근거리 모니터링 환경에 적합한 방향'],
    specs: [
      ['우퍼 크기', '5인치 (127mm)'],
      ['출력 (RMS)', '70W'],
      ['최대 출력 (Peak)', '100W'],
      ['주파수 응답', '50Hz ~ 20kHz'],
      ['최대 음압 (SPL)', '105dB'],
      ['앰프 방식·구성', '액티브 (Active) · 2-Way 바이앰프'],
      ['크로스오버', '2.5kHz'],
      ['제품 크기 (W×H×D)', '190×280×240mm'],
      ['무게', '5.5kg'],
      ['전원 사양', 'AC 100~240V'],
      ['구성품', '스피커, 전원 케이블, 설명서'],
      ['보증 기간', '1년'],
    ],
  },
  8: {
    id: '8',
    name: 'LC-8-112',
    image: s04Eight,
    size: 0.8,
    summary: ['넓은 작업 공간 및 스튜디오 환경', '더 큰 우퍼 유닛을 통한 저음 재생 잠재력', '공간을 채우는 사운드 강조'],
    specs: [
      ['우퍼 크기', '8인치 (203mm)'],
      ['출력 (RMS)', '150W'],
      ['최대 출력 (Peak)', '200W'],
      ['주파수 응답', '35Hz ~ 20kHz'],
      ['최대 음압 (SPL)', '112dB'],
      ['앰프 방식·구성', '액티브 (Active) · 2-Way 바이앰프'],
      ['크로스오버', '2.5kHz'],
      ['제품 크기 (W×H×D)', '260×390×320mm'],
      ['무게', '10.5kg'],
      ['전원 사양', 'AC 100~240V'],
      ['구성품', '스피커, 전원 케이블, 설명서'],
      ['보증 기간', '1년'],
    ],
  },
};
