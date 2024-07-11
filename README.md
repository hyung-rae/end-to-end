### 프로젝트 구조

```
|- 📁 tests
|    |- 📁 1depth               
|          |- 📁 2depth
|                |- 📁 helper
|                |- 📄 [test-name].spec.js
|
|    |- 📄 auth.seutp.js
```

- tests (프로젝트 root)
    - [테스트 네임].spec.js
        - 테스트 정의 및 테스트 함수 동기적으로 실행
        - helper 함수들의 집합
    - helper
        - 실제 테스트 코드
        - ui 요소는 html tag 네이밍 | xPath 으로 접근하기
        - `expect()`  테스트 결과 확인

### spec.js

```jsx
/** spec.js */

import { test } from '@playwright/test'
import * as helper from './helper'

/** 
* helper 함수의 집합 --> 실행될 테스트 정의 각각 하위 테스트들이 존재 
* 하위 테스트들은 병렬로 실행
*
* 배송 템플릿 관리 테스트 [최상위 테스트]
*    배송템플릿 등록 테스트 [하위 테스트]
*    배송템플릿 삭제 테스트 [하위 테스트]
*/
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

### helper func

```jsx
/** helper */

import { expect } from '@playwright/test'

const templateName = `템플릿-${new Date().toLocaleTimeString()}`

/** 배송 템플릿 목록 페이지 이동 */
export const gotoShippingTemplatePage = async page => {
  await page.goto('/admin/product/template')
  await expect(page.getByRole('tab', { name: '배송 템플릿' })).toBeVisible()
}

/** 배송 템플릿 등록 모달 */
export const clickAddShippingTemplateButton = async page => {
  await page.getByRole('button', { name: '템플릿 등록' }).click()

  await expect(page.getByRole('heading', { name: '기본 템플릿' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '템플릿 명 *' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '결제방식' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '묶음배송' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '배송방법(필수)' })).toBeVisible()
  
...
...
```

### test hooks

```jsx
test.describe('배송 템플릿 관리 테스트', () => {
	/**
	* beforeEach : 하위 테스트들이 각각 병렬로 실행 되기전 먼저 실행되는 테스트 코드
	*/
  test.beforeEach(async ({ page }) => {
    await helper.gotoShippingTemplatePage(page)
  })

	/**
	* afterEach : beforeEach hook 과 동일, 하위 테스트들이 각각 종료된 후 실행되는 코드
	*/
  test.afterEach(async ({ page }) => {
    await page.close()
  })

	/** other test code... */
})
```
