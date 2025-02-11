import { test } from '@playwright/test'
import { clickSiteSettingSaveButton } from './helper'
import {
  gotoSiteInfoPage,
  setSiteDescription,
  setSiteFavicon,
  setSiteMainImage,
  setSiteName,
  setSiteTitle,
} from './helper/index'

test.describe('사이트 정보', async () => {
  test(`사이트 정보 이름/제목/설명/대표이미지/파비콘이미지 수정 성공 케이스`, async ({ page }) => {
    await gotoSiteInfoPage(page)
    await setSiteName(page)
    await setSiteTitle(page)
    await setSiteDescription(page)
    await setSiteMainImage(page)
    await setSiteFavicon(page)
    await clickSiteSettingSaveButton(page)
  })
})
