import { test, expect } from '@playwright/test'
import {
  gotoProductAddPage,
  setDisplayStatusNotDisplay,
  setSaleStatusStop,
  setCategory,
  setProductName,
  setProductDescription,
  setProductMainImage,
  setProductPrice,
  setProductDetail,
  setDeliveryTemplateDefault,
  clickProductAddButton,
  addProductSuccess,
  addProductFail,
} from './helper'

test.describe('상품 등록', () => {
  test('상품 등록 성공 케이스', async ({ page }) => {
    await gotoProductAddPage(page)
    await setDisplayStatusNotDisplay(page)
    await setSaleStatusStop(page)
    await setCategory(page)
    await setProductName(page)
    await setProductDescription(page)
    await setProductMainImage(page)
    await setProductPrice(page)
    await setProductDetail(page)
    await setDeliveryTemplateDefault(page)
    await clickProductAddButton(page)
    await addProductSuccess(page)
  })

  test('상품 등록 실패 케이스, 대표 이미지 미등록', async ({ page }) => {
    await gotoProductAddPage(page)
    await clickProductAddButton(page)
    await addProductFail(page)
  })
})
