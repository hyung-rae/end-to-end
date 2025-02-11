import { expect } from '@playwright/test'

/** 주소지 정보 페이지 이동 */
export const gotoAddressPage = async page => {
  await page.goto('/admin/setting/default/address')
  await expect(page.getByRole('heading', '주소지 정보').first()).toBeVisible()
  await expect(page.getByText('주소지 목록')).toBeVisible()
}

/** 주소지 등록 버튼 클릭 후 등록 다이얼로그 확인 */
export const clickAddressAddButton = async page => {
  const addButton = page.getByRole('button', { name: '주소지 등록', exact: true })
  await addButton.click()

  await expect(page.getByRole('heading', { name: '주소지 등록' })).toBeVisible()
}

export const clickAddressItemButton = async page => {
  const addressItem = page.locator('//*[@id="__next"]/div/main/div[2]/div/div[2]/div/table/tbody/tr[1]')
  addressItem.waitFor({ state: 'visible' })
  await addressItem.click()

  await expect(page.getByRole('heading', { name: '주소지 수정' })).toBeVisible()
}

/** 주소지명, 담당자명, 대표 연락처, 보조 연락처 설정 */
export const setAddressInputData = async page => {
  const date = new Date()
  const dateStr = `${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  await page.locator('#dialog-root input[name="title"]').fill(`[${dateStr}] TEST`)
  await page.locator('#dialog-root input[name="name"]').fill('김승원')
  await page.locator('#dialog-root input[name="mainContact"]').fill('01012341234')
  await page.locator('#dialog-root input[name="subContact"]').fill('01012341234')
}

/** 주소 설정 (주소 찾기) */
export const setFindAddressData = async page => {
  await page.getByRole('button', { name: '주소찾기', exact: true }).click()

  const frameLocator = page
    .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
    .frameLocator('iframe[title="우편번호 검색 프레임"]')

  const searchInput = frameLocator.locator('input#region_name')
  await searchInput.fill('서울특별시 양천구 공항대로')
  await frameLocator.locator('.btn_search').waitFor()
  await frameLocator.locator('.btn_search').click()

  // 검색 후에 다시 한 번 iframe 선택해주어야 정상 동작함
  const frameLocatorResult = page
    .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
    .frameLocator('iframe[title="우편번호 검색 프레임"]')
  await frameLocatorResult.locator('ul.list_post').waitFor()

  const selectedAddress = frameLocatorResult.locator('.list_post_item').first()
  const mainAddress = selectedAddress.locator('dd.info_address.main_address .link_post')

  const postcode = await selectedAddress.locator('.txt_postcode').textContent() // 우편번호
  const address1 = await mainAddress.locator('.txt_addr').textContent() // 도로명 주소

  await mainAddress.click()

  // 주소 검색 다이얼로그 dom 에서 사라질 때까지 기다린다.
  await mainAddress.waitFor({ state: 'detached' })

  // 선택한 주소와 input 에 입력된 주소가 맞는지 확인
  const zipcodeInputValue = await page.locator('#dialog-root input[name="zipcode"]').inputValue()
  const addressInputValue = await page.locator('#dialog-root input[name="address1"]').inputValue()

  expect(zipcodeInputValue === postcode).toBeTruthy()
  expect(addressInputValue === address1).toBeTruthy()

  await page.locator('#dialog-root input[name="address2"]').fill('1000층')
}

/** 대표 주소지 설정 */
export const setMainAddressData = async page => {
  // 대표 출고지 지정 선택
  await page.locator('#dialog-root input[name="isShippingAddress"]').click()
  // 대표 반품지 지정 선택
  await page.locator('#dialog-root input[name="isReturnAddress"]').click()
}

/** 주소지 다이얼로그 내 등록 버튼 클릭 */
export const clickAddressSaveButton = async (page, isEdit = false) => {
  const addressName = await page.locator('#dialog-root input[name="title"]').inputValue()

  const saveButton = page.getByRole('button', { name: isEdit ? '수정' : '등록', exact: true })
  await saveButton.click()

  const dialog = await page.waitForEvent('dialog')
  console.log(dialog.message())
  expect(dialog.message()).toBe(isEdit ? '주소지 정보가 수정되었습니다.' : '주소지가 등록되었습니다.')
  await dialog.accept()

  const addressItem = page
    .locator('//*[@id="__next"]/div/main/div[2]/div/div[2]/div/table/tbody')
    .getByText(addressName)

  await addressItem.waitFor()
  await expect(addressItem).toBeVisible()

  const addressElement = await page.waitForSelector(
    `xpath=//*[@id="__next"]/div/main/div[2]/div/div[2]/div/table/tbody//*[contains(text(), "${addressName}")]`,
  )

  // 이제 해당 요소가 페이지에 나타났는지 확인할 수 있습니다.
  if (addressElement) {
    console.log('Element is found and visible.')
  } else {
    console.log('Element is not found or not visible.')
  }

  return addressName
}

export const deleteAddressItem = async (page, addressName) => {
  console.log('Name:', addressName)

  // addressName 으로 요소 찾기
  const addressItem = page
    .locator('//*[@id="__next"]/div/main/div[2]/div/div[2]/div/table/tbody')
    .getByText(addressName)
    .locator('..')
    .locator('..')

  //! page.on('dialog', ...) 코드는 다이얼로그가 발생하기 전에 설정되어 있어야 함. 즉 삭제하기 버튼을 클릭하는 코드보다 이전에 작성되어야 함.
  // 다이얼로그 설정
  page.on('dialog', async dialog => {
    console.log(`🔖 Dialog message: ${dialog.message()}`)

    const confirmMsg = '주소지를 삭제하시겠습니까?'
    const successMsg = '주소지가 삭제 되었습니다.'

    if (dialog.message() !== confirmMsg) {
      expect(dialog.message()).toBe(successMsg)
    }
    await dialog.accept()
  })

  // 톱니바퀴 눌러서 삭제하기 버튼 클릭
  await addressItem.locator('td').last().click()
  const deleteButton = page.locator('xpath=/html/body/div[4]/div[3]/ul/li[5]')
  await deleteButton.waitFor({ state: 'visible' })
  await deleteButton.click()

  await page.waitForSelector(
    `xpath=//*[@id="__next"]/div/main/div[2]/div/div[2]/div/table/tbody//*[contains(text(), "${addressName}")]`,
    { state: 'detached' },
  )
}
