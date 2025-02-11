import { test, expect } from '@playwright/test'
import {
  clickAddressAddButton,
  clickAddressItemButton,
  clickAddressSaveButton,
  deleteAddressItem,
  gotoAddressPage,
  setAddressInputData,
  setFindAddressData,
  setMainAddressData,
} from './helper'

test.describe('사이트 정보', async () => {
  test(`주소지 정보 등록 성공 케이스`, async ({ page }) => {
    await gotoAddressPage(page)
    await clickAddressAddButton(page)
    await setAddressInputData(page)
    await setFindAddressData(page)
    await setMainAddressData(page)
    await clickAddressSaveButton(page)
  })

  test(`주소지 정보 수정 성공 케이스`, async ({ page }) => {
    await gotoAddressPage(page)
    await clickAddressItemButton(page)
    await setAddressInputData(page)
    await setFindAddressData(page)
    await clickAddressSaveButton(page, true)
  })

  test(`주소지 정보 삭제 성공 케이스`, async ({ page }) => {
    // 등록
    await gotoAddressPage(page)
    await clickAddressAddButton(page)
    await setAddressInputData(page)
    await setFindAddressData(page)
    const addressName = await clickAddressSaveButton(page)

    // 삭제
    await deleteAddressItem(page, addressName)
  })
})
