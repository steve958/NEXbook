import React, { useEffect, useState } from 'react'
import './RightBar.css'
import Loading from './Loading'

const RightBar: React.FC = () => {
  const [currentAdUrl, setCurrentAdUrl] = useState<string>('')
  const [adChange, setAdChange] = useState<boolean>(false)
  useEffect(() => {
    setAds()
  }, [adChange])

  function setAds() {
    const adsURL = [
      'https://d3el976p2k4mvu.cloudfront.net/medias/sys_master/h3a/h13/8969423257630.jpg',
      'https://cdn1.interspar.at/cachableservlets/articleImage.dam/si/250824/dt_zoom.jpg',
      'https://charleroi-duty-free.com/media/catalog/product/j/a/jameson-irish-whiskey-400_2.jpg',
      'https://dutyfreeamericas.com/media/catalog/product/cache/53cce2ce967a2110739ef29aa91fd722/j/o/johnnie_walker_red_label_1l_front_1.jpg',
      'https://www.renexinternational.com/files/cache/cortes-extra-bottle-1ac1ffb4.jpg',
      'https://www.ediskont.rs/uploads/store/products/images/vinjak-5-rubin-0.75l-937-618bb689d220f.webp',
    ]

    const randomize = () => {
      setCurrentAdUrl(adsURL[Math.round(Math.random() * 6)])
      setAdChange(!adChange)
    }
    setTimeout(randomize, 3000)

    return currentAdUrl
  }

  return (
    <div id="right-bar-wrapper">
      <h1>ADS PANEL</h1>
      {!currentAdUrl && <Loading/>}
      <img id="right-bar-ad-img" src={currentAdUrl} alt="" />
      {currentAdUrl && <h2>DRIVE LESS, DRINK MORE</h2>}
    </div>
  )
}

export default RightBar
