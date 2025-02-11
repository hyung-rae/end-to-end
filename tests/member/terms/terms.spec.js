import { test } from '@playwright/test'
import { gotoTermsPage, updateTerm1, updateTerm2, updateTerm3, updateTerm4, updateTerm5 } from './helper'

test.describe('가입약관', async () => {
  test('가입약관 수정 성공 케이스', async ({ page }) => {
    await gotoTermsPage(page)
    await updateTerm1(page) // 이용약관
    await updateTerm2(page) // 개인정보처리방침
    await updateTerm3(page) // 개인정보 수집 및 이용 동의(회원가입시)
    await updateTerm4(page) // 개인정보 수집 및 이용 동의(비회원 구매시)
    await updateTerm5(page) // 마케팅활용동의 및 광고수신동의
  })
})
