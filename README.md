# Playwright Test code
> Playwright 로 테스트 코드 작성과 모듈화  
> github action trigger를 통해 cicd 과정에서 테스트 코드 자동화

### 구조

```Text
|- 📁 tests
|     |- 📁 helper
|     |- 📄 [test-name].spec.js
|   |- 📄 auth.seutp.js
```

### spec.js

- helper 함수의 집합 --> 실행될 테스트 정의 각각 하위 테스트들이 존재
- 하위 테스트들은 병렬로 실행

```javascript
test.describe('배송 템플릿 관리 테스트', () => {
  /** test hooks code... */

  test('배송템플릿 등록 테스트', async ({ page }) => {
    await helper.clickAddShippingTemplateButton(page)
    await helper.checkValidationAddShippingTemplate(page)
    await helper.addShippingTemplate(page)
  })

  test('배송템플릿 삭제 테스트', async ({ page }) => {
    await helper.deleteShippingTemplate(page)
  })
})
```

### helper

- spec.js에 사용되는 실질적 test code
- `expect` : 테스트할 구문
- Playwright 에서 제공하는 hooks 세부 코드도 여기다 정의

```javascript
import { expect } from '@playwright/test'

const templateName = `템플릿-${new Date().toLocaleTimeString()}`

/** 배송 템플릿 목록 페이지 이동 */
export const gotoShippingTemplatePage = async page => {
  await page.goto('/admin/product/template')
  await expect(page.getByRole('tab', { name: '배송 템플릿' })).toBeVisible()
}
```

### hooks

- 거의 대부분 인터셉터 기능
- beforeEach : 하위 테스트들이 각각 병렬로 실행 되기전 먼저 실행되는 테스트 코드
- afterEach : beforeEach hook 과 동일, 하위 테스트들이 각각 종료된 후 실행되는 코드

```javascript
test.describe('배송 템플릿 관리 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await helper.gotoShippingTemplatePage(page)
  })
  test.afterEach(async ({ page }) => {
    await page.close()
  })
})
```
