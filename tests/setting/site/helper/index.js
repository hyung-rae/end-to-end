import { expect } from '@playwright/test'

/** 사이트 정보 페이지 이동 */
export const gotoSiteInfoPage = async page => {
  await page.goto('/admin/setting/default/site')
  await expect(page.getByRole('heading', '사이트 정보').first()).toBeVisible()
  await expect(page.getByText('썸네일 미리보기')).toBeVisible()
  await expect(page.getByText('웹페이지 미리보기')).toBeVisible()
}

/** 사이트 이름 */
export const setSiteName = async page => {
  const siteNameInput = page.locator('input[name="name"]')
  await siteNameInput.fill('playwright 사이트 이름')
  const siteNameInputValue = await siteNameInput.inputValue()

  const isTextLessThan20Chars = siteNameInputValue.length <= 20
  expect(isTextLessThan20Chars).toBeTruthy()
}

/** 사이트 제목 */
export const setSiteTitle = async page => {
  const siteTitleInput = page.locator('input[name="title"]')
  await siteTitleInput.fill('playwright 사이트 제목')
  const siteTitleInputValue = await siteTitleInput.inputValue()

  const isTextLessThan20Chars = siteTitleInputValue.length <= 20
  expect(isTextLessThan20Chars).toBeTruthy()
}

/** 사이트 설명 */
export const setSiteDescription = async page => {
  const siteDescriptionInput = page.locator('input[name="description"]')
  await siteDescriptionInput.fill(
    '쉽고 빠르게 다양한 서비스를 제공하는 종합 플랫폼, 여러분의 일상을 편리하게 만들어 드립니다.',
  )
  const siteDescriptionInputValue = await siteDescriptionInput.inputValue()

  const isTextLessThan80Chars = siteDescriptionInputValue.length <= 80
  expect(isTextLessThan80Chars).toBeTruthy()
}

/** 대표이미지 */
export const setSiteMainImage = async page => {
  const imageContainerSelector = '//*[@id="__next"]/div/main/div[2]/div/div[2]/div[2]/div/div[4]/div/div[1]/div'
  const imageRemoveSelector = '//*[@id="__next"]/div/main/div[2]/div/div[2]/div[2]/div/div[4]/div/div[1]/div/div'
  const imageAddSelector = 'label.default-image-add'

  await page.locator(imageContainerSelector).hover()
  const isVisible = await page.isVisible(imageRemoveSelector)

  // 이미 대표 이미지가 저장되어 있어서 삭제 아이콘이 보인다면 삭제한다.
  if (isVisible) {
    await page
      .waitForSelector(imageRemoveSelector, {
        state: 'visible',
      })
      .then(async () => {
        await page.locator(imageRemoveSelector).click()
      })
  }

  // 이미지 컨테이너에 hover 한 후 이미지 업로드 ui 가 보이면 클릭하여 이미지를 업로드한다.
  await page.locator(imageContainerSelector).hover()
  await page.waitForSelector(imageAddSelector, { state: 'visible' }).then(async () => {
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.locator(imageAddSelector).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles('./images/setting/main.jpg')
  })

  // 등록된 이미지가 화면에 보이는지 확인한다.
  await page.getByAltText('대표이미지').waitFor()
  expect(page.getByAltText('대표이미지')).toBeVisible()
}

/** 파비콘 */
export const setSiteFavicon = async page => {
  const imageContainerSelector = '//*[@id="__next"]/div/main/div[2]/div/div[2]/div[2]/div/div[5]/div/div[1]/div'
  const imageRemoveSelector = '//*[@id="__next"]/div/main/div[2]/div/div[2]/div[2]/div/div[5]/div/div[1]/div/div'
  const imageAddSelector = '//*[@id="__next"]/div/main/div[2]/div/div[2]/div[2]/div/div[5]/div/div[1]/div/label'

  await page.locator(imageContainerSelector).hover()
  const isVisible = await page.isVisible(imageRemoveSelector)

  // 이미 대표 이미지가 저장되어 있어서 삭제 아이콘이 보인다면 삭제한다.
  if (isVisible) {
    await page
      .waitForSelector(imageRemoveSelector, {
        state: 'visible',
      })
      .then(async () => {
        await page.locator(imageRemoveSelector).click()
      })
  }

  // 이미지 컨테이너에 hover 한 후 이미지 업로드 ui 가 보이면 클릭하여 이미지를 업로드한다.
  await page.locator(imageContainerSelector).hover()
  await page.waitForSelector(imageAddSelector, { state: 'visible' }).then(async () => {
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.locator(imageAddSelector).click()
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles('./images/setting/favicon.png')
  })

  // 등록된 이미지가 화면에 보이는지 확인한다.
  // await page.getByAltText('사이트 파비콘').waitFor()
  // expect(page.getByAltText('사이트 파비콘')).toBeVisible()
}

export const clickSiteSettingSaveButton = async page => {
  const saveButton = page.getByRole('button', { name: '저장', exact: true })
  await saveButton.click()

  await page.waitForEvent('dialog')

  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    expect(dialog.message()).toBe('설정이 저장되었습니다.')
    await dialog.dismiss().catch(() => {})
    await page.close()
  })
}
