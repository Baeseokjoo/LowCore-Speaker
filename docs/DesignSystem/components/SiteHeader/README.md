# SiteHeader

화면 위에 고정되는 헤더입니다. 왼쪽에 로고 이미지(`LowCore_logo_white.png`, 높이 28px), 오른쪽에 `NavMenu`가 있습니다.

- 넣을 것: `items`, `scrolled`(히어로를 40px 넘게 지나면 true), `onNavigate`, `onHome`.
- 소비하는 쪽에서 `position: fixed; top: 0; left: 0; right: 0`을 줍니다. 높이는 `header-height`입니다.
- 히어로에서는 투명하고, `scrolled`이면 `scrim` + `blur-header` + 아래 `line`이 생깁니다.
