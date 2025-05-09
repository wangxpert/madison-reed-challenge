import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ImageGallery from '../ImageGallery.vue'

describe('ImageGallery.vue', () => {
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

  let globalConfig: {
    global: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugins: any[]
    }
  }

  beforeEach(() => {
    // Centralized setup for Pinia and global configuration
    globalConfig = {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn, // Configure the spy function
            initialState: {
              imageStore: {
                images,
                isLoading: false,
              },
            },
          }),
        ],
      },
    }
  })

  it('renders a grid of images from the store', () => {
    const wrapper = mount(ImageGallery, {
      ...globalConfig,
    })

    expect(wrapper.findAll('img').length).toBe(images.length)
  })

  it('calls openModal when an image is clicked', async () => {
    const openModal = vi.fn()
    const wrapper = mount(ImageGallery, {
      ...globalConfig,
      attrs: {
        onOpenModal: openModal, // Listen for the openModal event
      },
    })

    await wrapper.find('img').trigger('click')
    expect(openModal).toHaveBeenCalled()
  })

  it('renders no images when the store has an empty images array', () => {
    const wrapper = mount(ImageGallery, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              imageStore: {
                images: [],
                isLoading: false,
              },
            },
          }),
        ],
      },
    })

    expect(wrapper.findAll('img').length).toBe(0)
    expect(wrapper.text()).toContain('No Images Available') // Assuming the component shows this message
  })

  it('applies hover effects to images', async () => {
    const wrapper = mount(ImageGallery, {
      ...globalConfig,
    })

    const firstImage = wrapper.find('img')
    await firstImage.trigger('mouseover')
    expect(firstImage.classes()).toContain('group-hover:scale-105') // Assuming Tailwind hover effect
  })
})
