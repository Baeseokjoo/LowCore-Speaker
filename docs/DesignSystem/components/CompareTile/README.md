# CompareTile

S02 비교 체험의 이미지 버튼(B07 PC 스피커 / B08 5인치 / B09 8인치)입니다. 세 개를 같은 크기로 가로로 놓습니다. 모델 이름은 데스크톱에서 이미지 안 왼쪽 위 20px(16px, 600, `fg`)에, 1023px 이하에서는 이미지 테두리 바깥 위 가운데(8px 띄움, 14px, 600, `fg`)에 둡니다. `dimmed`일 때 이름도 함께 흐려집니다(2026-11-16).

- 넣을 것: `kind`, `state`(`idle` | `selected` | `dimmed`), `playing`, `progress`, `onSelect`, `onToggle`.
- 기본은 셋 다 `idle`입니다. 하나를 누르면 그것만 `selected`(1.04배, `orchid` 2px 테두리, `PlayControl` 등장), 나머지는 `dimmed`(0.97배, `blur-dimmed`)가 됩니다.
- 선택한 것을 다시 누르면 셋 다 `idle`로 돌아가고, 재생 중이었다면 소리를 멈춥니다. 재생 중에 다른 것을 골라도 소리를 멈춥니다.
- 선택 전 `idle`에서만 마우스 틸트(최대 약 12°)와 뒤 빛(`smoke-magenta`, `smoke-plum`, 들린 가장자리 쪽)을 줍니다. 이 부분은 소비하는 쪽이 `style`의 `transform`과 `box-shadow`로 넣습니다. 호버 중에는 빛이 바로 켜지고 지연 없이 따라가며 기울기는 80ms로 따라갑니다. 커서가 나가면 빛은 200ms에 꺼집니다(2026-11-16). 터치 기기에는 주지 않습니다.
