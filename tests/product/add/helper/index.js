import { expect } from '@playwright/test'

/** 상품 등록 페이지 이동 */
export const gotoProductAddPage = async page => {
  await page.goto('http://front.dev.qshop.ai:3002/admin/product/add')
  await expect(page.getByRole('heading', '상품 등록').first()).toBeVisible()
}

/** 진열상태 선택 (진열안함) */
export const setDisplayStatusNotDisplay = async page => {
  await page.locator('//*[@id="p-display"]/div[1]/div/div/label[1]').click()
  const displayBody = await page.locator('//*[@id="p-display"]/div[2]').getAttribute('disabled')

  const isDisplayBodyDisabled = displayBody !== null
  expect(isDisplayBodyDisabled).toBeTruthy()
}

/** 판매상태 선택 (판매중단) */
export const setSaleStatusStop = async page => {
  await page.locator('//*[@id="p-sale"]/div[1]/div[2]/div/label[2]').click()
  const stopTextInput = page.locator('input[name="stopText"]')
  await stopTextInput.fill('이 상품은 판매중단된 상품입니다.')
  const stopTextInputValue = await stopTextInput.inputValue()

  const isTextLessThan20Chars = stopTextInputValue.length <= 20
  expect(isTextLessThan20Chars).toBeTruthy()
}

/** 카테고리 선택 */
export const setCategory = async page => {
  await page.locator('//*[@id="p-categories"]/div[1]/div/button').click()
  await expect(page.getByRole('heading', { name: '카테고리 선택' }).first()).toBeVisible()

  await page
    .locator(
      '//*[@id="dialog-root"]/div/section/div/main/div/div[2]/div[1]/div/div/div[1]/div[2]/div/div/div/div[2]/div[1]/span/div/label',
    )
    .click()
  await expect(page.locator('//*[@id="dialog-root"]/div/section/div/main/div/section/div/div')).toBeVisible()

  const confirmButton = page.locator('//*[@id="dialog-root"]/div/section/footer/button[2]')
  const isDisabledButton = await confirmButton.isDisabled()
  expect(isDisabledButton).toBeFalsy()
  await confirmButton.click()

  const selectedCategoryBadge = await page.waitForSelector('//*[@id="p-categories"]/div[2]/div/div/section/div/div')
  expect(await selectedCategoryBadge.isVisible()).toBeTruthy()
}

/** 상품명 입력 */
export const setProductName = async page => {
  const productNameInput = page.locator('//*[@id="p-name"]/div[2]/div[1]/div/div/input')
  await productNameInput.fill('playwright 테스트 상품')
  const productNameInputValue = await productNameInput.inputValue()

  const isTextNotEmpty = Boolean(productNameInputValue?.trim())
  expect(isTextNotEmpty).toBeTruthy()
  const isTextLessThan100Chars = productNameInputValue.length <= 100
  expect(isTextLessThan100Chars).toBeTruthy()
  const isTextMoreThan100Chars = productNameInputValue.length >= 1
  expect(isTextMoreThan100Chars).toBeTruthy()
}

/** 상품 요약 설명 입력 */
export const setProductDescription = async page => {
  const productDescriptionTextarea = page.locator('//*[@id="p-name"]/div[2]/div[2]/div/div/textarea')
  await productDescriptionTextarea.fill('playwright 테스트 상품의 요약 설명입니다.')
  const productDescriptionTextareaValue = await productDescriptionTextarea.inputValue()

  const isTextLessThan1000Chars = productDescriptionTextareaValue.length <= 1000
  expect(isTextLessThan1000Chars).toBeTruthy()
}

/** 대표 이미지 선택 */
export const setProductMainImage = async page => {
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.locator('//*[@id="p-image"]/div[2]/div[1]/div[2]/div').click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles('/Users/seung/Desktop/dev/qshop-admin/public/images/mainImage.png')

  await page.getByAltText('상품 대표이미지').waitFor()
  expect(page.getByAltText('상품 대표이미지')).toBeVisible()
}

/** 상품 정가 입력 */
export const setProductPrice = async page => {
  const productPriceInput = page.locator('//*[@id="p-price"]/div[2]/div[1]/div/div/input')
  await productPriceInput.fill('100000')
  await productPriceInput.blur()
  const productPriceInputValue = await productPriceInput.inputValue()

  const hasCommaNumber = productPriceInputValue === '100,000'
  expect(hasCommaNumber).toBeTruthy()
  const isNotEmpty = productPriceInputValue !== null
  expect(isNotEmpty).toBeTruthy()
  const isNumberLessThanBillion = productPriceInputValue.replace(',', '') <= 1_000_000_000
  expect(isNumberLessThanBillion).toBeTruthy()
  const isNumberMoreThan0 = productPriceInputValue.replace(',', '') >= 0
  expect(isNumberMoreThan0).toBeTruthy()
}

/** 상세설명 입력 */
export const setProductDetail = async page => {
  const productDetailEl = page.locator('//*[@id="p-detail"]/div[2]/div/div/div[2]/div[2]/div')
  await productDetailEl.waitFor()
  await productDetailEl.click()
  await page.keyboard.type('이것은 상품 상세 입니다.')

  const productDetailInnerText = await productDetailEl.innerHTML()
  const isTextNotEmpty = Boolean(productDetailInnerText?.trim())
  expect(isTextNotEmpty).toBeTruthy()
  const isTextLessThan100000 = productDetailInnerText.length <= 100_000
  expect(isTextLessThan100000).toBeTruthy()
  const isTextMoreThan1 = productDetailInnerText.length >= 1
  expect(isTextMoreThan1).toBeTruthy()
}

/** 배송설정 선택 (기본 템플릿 그대로 사용) */
export const setDeliveryTemplateDefault = async page => {
  const deliveryTemplateDefaultBadgeText = await page
    .locator('//*[@id="mui-component-select-deliveryTemplateId"]/div/div/span')
    .innerText()
  const isDefaultBadge = deliveryTemplateDefaultBadgeText === '기본'
  expect(isDefaultBadge).toBeTruthy()
}

/** 상품 등록 버튼 클릭 */
export const clickProductAddButton = async page => {
  await page.getByRole('button', { name: '등록', exact: true }).click()
}

/** 대표 이미지 필수 에러 텍스트 */
export const hasMainImageError = async page => {
  const mainImageErrorText = await page.locator('//*[@id="p-image"]/div[2]/div[1]/div[2]/div/div/span').innerText()
  const hasErrorText = mainImageErrorText === '상품의 대표 이미지는 필수사항입니다.'
  expect(hasErrorText).toBeTruthy()
}

/** 상품 등록 성공 */
export const addProductSuccess = async page => {
  await page.getByRole('button', { name: '상품등록' }).waitFor()
  await expect(page).toHaveURL(/.*\/product\/list/)
}

/** 상품 등록 실패 */
export const addProductFail = async page => {
  await hasMainImageError(page)
}
