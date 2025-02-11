import { test } from '@playwright/test'
import * as shippingHelper from './helper/shippingHelper'
import * as noticeHelper from './helper/noticeHelper'

test.describe('배송 템플릿관리 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await shippingHelper.gotoShippingTemplatePage(page)
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('배송템플릿 등록 테스트', async ({ page }) => {
    await shippingHelper.clickAddShippingTemplateButton(page)
    await shippingHelper.checkValidationAddShippingTemplate(page)
    await shippingHelper.addShippingTemplate(page)
  })

  test('배송템플릿 수정 테스트', async ({ page }) => {
    await shippingHelper.updateShippingTemplate(page)
  })

  test('배송템플릿 삭제 테스트', async ({ page }) => {
    await shippingHelper.deleteShippingTemplate(page)
  })
})

test.describe('상품정보제공고시 템플릿관리 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await noticeHelper.gotoNoticeTemplatePage(page)
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('상정공 템플릿 등록 테스트', async ({ page }) => {
    await noticeHelper.clickAddNoticeTemplateButton(page)
    await noticeHelper.checkValidationAddNoticeTemplate(page)
    await noticeHelper.addNoticeTemplate(page)
  })

  test('상정공 템플릿 수정 테스트', async ({ page }) => {
    await noticeHelper.updateNoticeTemplate(page)
  })

  test('상정공 템플릿 삭제 테스트', async ({ page }) => {
    await noticeHelper.deleteNoticeTemplate(page)
  })
})
