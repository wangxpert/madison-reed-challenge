import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia, type TestingPinia } from '@pinia/testing'
import ImageModal from '../ImageModal.vue'

describe('ImageModal.vue', () => {
  const images = [
    {
      id: '1',
      download_url: 'https://example.com/image1.jpg',
      author: 'Author 1',
      width: 800,
      height: 600,
    },
    {
      id: '2',
      download_url: 'https://example.com/image2.jpg',
      author: 'Author 2',
      width: 800,
      height: 600,
    },
  ]

  const selectedImage = {
    id: '1',
    download_url: 'https://example.com/image1.jpg',
    author: 'Author 1',
    width: 800,
    height: 600,
  }

  let createPinia: TestingPinia
  let globalConfig: {
    global: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugins: any[]
    }
  }

  beforeEach(() => {
    // Centralized setup for Pinia and global configuration
    createPinia = createTestingPinia({
      createSpy: vi.fn, // Configure the spy function
      initialState: {
        imageStore: {
          images,
          isLoading: false,
        },
      },
    })
    globalConfig = {
      global: {
        plugins: [createPinia],
      },
    }
  })

  it('renders the selected image', () => {
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal: vi.fn(),
        currentIndex: 0,
        setCurrentIndex: vi.fn(),
      },
    })

    expect(wrapper.find('img').attributes('src')).toBe(selectedImage.download_url)
    expect(wrapper.find('h2').text()).toBe(selectedImage.author)
  })

  it('calls closeModal when the modal background is clicked', async () => {
    const closeModal = vi.fn()
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal,
        currentIndex: 0,
        setCurrentIndex: vi.fn(),
      },
    })

    await wrapper.trigger('click')
    expect(closeModal).toHaveBeenCalled()
  })

  it('navigates to the next image when "Next" is clicked', async () => {
    const setCurrentIndex = vi.fn()
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal: vi.fn(),
        currentIndex: 0,
        setCurrentIndex,
      },
    })

    const nextButton = wrapper.find('[data-testid="next-button"]')
    expect(nextButton.exists()).toBe(true)

    await nextButton.trigger('click')
    expect(setCurrentIndex).toHaveBeenCalledWith(1)
  })

  it('does not render "Next" button if there is no next image', () => {
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal: vi.fn(),
        currentIndex: images.length - 1, // Last image
        setCurrentIndex: vi.fn(),
      },
    })

    const nextButton = wrapper.find('[data-testid="next-button"]')
    expect(nextButton.exists()).toBe(false)
  })

  it('navigates to the previous image when "Previous" is clicked', async () => {
    const setCurrentIndex = vi.fn()
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal: vi.fn(),
        currentIndex: 1, // Second image
        setCurrentIndex,
      },
    })

    const prevButton = wrapper.find('[data-testid="prev-button"]')
    expect(prevButton.exists()).toBe(true)

    await prevButton.trigger('click')
    expect(setCurrentIndex).toHaveBeenCalledWith(0) // Navigate to the first image
  })

  it('does not render "Previous" button if there is no previous image', () => {
    const wrapper = mount(ImageModal, {
      ...globalConfig,
      props: {
        selectedImage,
        closeModal: vi.fn(),
        currentIndex: 0, // First image
        setCurrentIndex: vi.fn(),
      },
    })

    const prevButton = wrapper.find('[data-testid="prev-button"]')
    expect(prevButton.exists()).toBe(false)
  })
})
