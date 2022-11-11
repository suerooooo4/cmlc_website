export default (context, inject) => {
  inject('fakeData', (type, i) => {
    let data = {
      search: [
        {
          image:
            'https://www.accesscreative.ac.uk/wp-content/uploads/2017/03/Digital-Media-Course-Video-Production.jpg',
          topic:
            'หลักสูตรการทำสื่อ',
        },
        {
          image:
            'https://www.unicef.org/thailand/sites/unicef.org.thailand/files/styles/hero_mobile/public/2018-08/IMG_7147.jpg?itok=OQs-ID-8',
          topic: 'การฝึกอบรมนักข่าวชุมชนรุ่นใหม่',
        },
        {
          image:
            'https://cdn.corporatefinanceinstitute.com/assets/time-management.jpg',
          topic: 'การบริหารเวลาอย่างมีประสิทธิภาพ',
        },
      ],
      training: [
        {
          image:
            'https://www.accesscreative.ac.uk/wp-content/uploads/2017/03/Digital-Media-Course-Video-Production.jpg',
          topic: 'การฝึกอบรมการทำสื่อ',
        },
        {
          image:
            'https://www.unicef.org/thailand/sites/unicef.org.thailand/files/styles/hero_mobile/public/2018-08/IMG_7147.jpg?itok=OQs-ID-8',
          topic: 'การฝึกอบรมนักข่าวชุมชนรุ่นใหม่',
        },
      ],
      training_video: [
        {
          image:
            'https://lh3.googleusercontent.com/proxy/CQUPV0OXz2n-kflfHQ0EZbuM08HVCLPmgdOt2BMW0IsreBTXxsXMq4qnFC8tskHk2RCo2S5ssEDSUNu7mZVQHaSn2UlJdxn6aB-Vw1L9jadRGaH15C0VSCKxk4iQjQFBzkH3nxjWZkWI3j5MN2-77w2mFaQyHKsd3Pw',
          topic: 'การพัฒนาสื่อสมัยใหม่',
        },
      ],
      training_document: [
        {
          image:
            'https://lh3.googleusercontent.com/proxy/IBFR-HbpZwI5esdjLTiK_88WdwqUMBojlHtLRi53RYOSc5nNRf8np3c8yaf2DLBoAXKvXsE92WEMuY77GNuKbLRla-97vipRkEJhrRYf9Comt7bleunc888m6Octf74dfZGPah2pbyAHckKUtykOFE2uKCVJkfyPdIvR7buwCA_V26Xw_tYjEkE6Uz7SLamrHjyNxqW7x5C4dcaP8O5Q0_k8F0SZf0i9EsER8iOU6k8LrzZ8fqNnE1q_MhXfEwvLL-oiYU9N5Tazw4iVNpnztxt3eA8tvTQRvNecxcsPCItWn5aMFg5K9ZSNQ8N_vNOySlx6PCs7_Q',
          topic: 'หลักสูตรการทำสื่อ',
        },
      ],
      training_portfolio: [
        {
          image:
            'https://cdn.chiangmainews.co.th/wp-content/uploads/2019/02/06101252/49091-800x600.jpg',
          topic: 'ทางเล็กในป่าใหญ่',
        },
        {
          image:
            'https://travel.mthai.com/app/uploads/2016/12/bongpiang101.jpg',
          topic: 'ท่องเที่ยวทั่วไป',
        },
        {
          image:
            'https://tiewpakklang.com/wp-content/uploads/2020/03/S__2138117-634x475.jpg',
          topic: 'ของดีประจำหมู่บ้าน',
        },
      ],
      media_master: [
        {
          image: 'https://static.thairath.co.th/media/NjpUs24nCQKx5e1A7Wy2EyxEsuLwpZ4CH3twj0XM7Sn.jpg',
          topic: 'การถ่ายสารคดีสัตว์',
          media_category_id: 1,
        },
        {
          image: 'https://images.thaiza.com/34/34_20150122173646..jpg',
          topic: 'การถ่ายภาพสัตว์',
          media_category_id: 2,
        },
        {
          image: 'https://images-se-ed.com/ws/Storage/Originals/978616/465/9786164650084L.jpg?h=47448c6dce84354cc538d1b4680b0f16',
          topic: 'แรงบันดานใจสำรวจโลก',
          media_category_id: 3,
        },
        {
          image: 'https://digitorystyle.com/wp-content/uploads/2020/03/podcast2_0-1024x1024.jpg',
          topic: 'การตลาดออนไลน์',
          media_category_id: 4,
        }
      ],
      media_training: [
        {
          image: 'https://ichef.bbci.co.uk/images/ic/1024x576/p06sp2f9.jpg',
          topic: 'การถ่ายสารคดีสัตว์',
          media_category_id: 1,
        },
        {
          image: 'https://f.ptcdn.info/080/034/000/1438616669-2-o.jpg',
          topic: 'การถ่ายภาพสัตว์',
          media_category_id: 2,
        },
        {
          image: 'https://images-se-ed.com/ws/Storage/Originals/978616/465/9786164650091L.jpg?h=39073fea4f9ccfb9dab4048f96d06492',
          topic: 'แรงบันดานใจสำรวจโลก',
          media_category_id: 3,
        },
        {
          image: 'https://s.isanook.com/hi/0/rp/rc/w850h510/yacxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hpLzAvdWQvMzA3LzE1MzY5NTcvNC5qcGc=.jpg',
          topic: 'การตลาดออนไลน์',
          media_category_id: 4,
        }
      ],
      media_general: [
        {
          image: 'https://thaipbs-program.s3-ap-southeast-1.amazonaws.com/content/images/episode/1/BJ/FS/1BJFSBfSTZ1c-large.jpg',
          topic: 'การถ่ายสารคดีสัตว์',
          media_category_id: 1,
        },
        {
          image: 'https://www.chillpainai.com/src/wewakeup/scoop/img_scoop/scoop/kat/trend/animal%20photographer/jjjjjggg.jpg',
          topic: 'การถ่ายภาพสัตว์',
          media_category_id: 2,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBPVKgL-X8SRaAeoVss8R--uLNQKfIiod1ZsyUKoYc0NfO095qfjun_esMZK9n6UuMbA&usqp=CAU',
          topic: 'แรงบันดานใจสำรวจโลก',
          media_category_id: 3,
        },
        {
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtKZ2cviJiRpb454kN43Bicx5KpIH7f-zg&usqp=CAU',
          topic: 'การตลาดออนไลน์',
          media_category_id: 4,
        }
      ],
      media_global: [
        {
          image: 'https://nofilmschool.com/sites/default/files/styles/article_wide/public/production.jpg?itok=QOCeruB5',
          topic:
            'การถ่ายทำภาพยนต์',
        },
      ],
      member_group: [
        {
          image: 'https://www.cgd.go.th/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1438169542459&ssbinary=true',
          name: 'กลุ่มพะเยาชาแนล'
        }
      ],
      member_group_member: [
        {
          image: 'https://www.dfprochair.com/wp-content/uploads/2020/10/businessman-character-avatar-isolated_24877-60111.jpg',
          name: 'สมชาย แดง',
          career: 'เกษตรกร'
        }
      ],
      member_group_portfolio: [
        {
          image: 'https://t1.bdtcdn.net/photos/2020/04/5ea15cdfb726161095e6450d_800x0xcover_hBVBwYpZ.jpg',
          topic: 'ขั้นตอนการเกษตร'
        }
      ],
      course: [
        {
          image:
            'https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.18169-9/1503364_779866808772363_4548206783871560003_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=9267fe&_nc_ohc=blCvXM4aji0AX8O3irs&_nc_ht=scontent.fbkk10-1.fna&oh=6bd0121c698b8fd890e2580535193027&oe=615C4BBF',
          topic:
            'หลักสูตรการทำสื่อ',
        },
      ],
      law: [
        {
          image:
            'https://nationalmagazine.ca/MediaGallery/NM/NationalMagazine/Articles/Law/Access-to-Justice/Digital-law-769x468.jpg?ext=.jpg',
          topic:
            'กฎหมายดิจิทัลไทย',
        },
      ],
      forum: [
        {
          image:
            'https://dm.lnwfile.com/_/dm/_raw/x4/qb/e9.jpg',
          topic:
            'ขั้นตอนการปลูกผัก',
        },
        {
          image:
            'https://www.thaiticketmajor.com/variety/img_news/title/original1/0183/9183/title_ttmnews_9183-20180515141236.jpg',
          topic:
            'แนะนำไอเดียทำแปลงผัก',
        },
        {
          image:
            'https://cdn.corporatefinanceinstitute.com/assets/time-management.jpg',
          topic: 'เทคนิคการบริหารเวลาอย่างมีประสิทธิภาพ',
        },
      ],
      gallery: [
        {
          image:
            'https://upload.wikimedia.org/wikipedia/commons/2/28/Chocolate_Hills_overview.JPG',
          topic:
            'เนินเขา',
        },
        {
          image:
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/268451251.jpg?k=e4fed6edd8fdad2d49271081cea0e31e83134cabb70cccf093c7408600ecfd45&o=&hp=1',
          topic:
            'Homestay',
        },
        {
          image:
            'https://dm.lnwfile.com/_/dm/_raw/x4/qb/e9.jpg',
          topic:
            'การปลูกผัก',
        },
        {
          image:
            'https://travel.mthai.com/app/uploads/2016/04/121648qh7dbccgw4ahw6we.jpg',
          topic:
            'ท่องเที่ยวทะเล',
        },
        {
          image:
            'https://www.thaiticketmajor.com/variety/img_news/title/original1/0183/9183/title_ttmnews_9183-20180515141236.jpg',
          topic:
            'ไอเดียแปลงผัก',
        },
      ],
      news: [
        {
          image:
            'https://plk.s6img.com/society6/img/tWLwuBi7FGRUM0F-uT65i9Y-epE/w_700/wall-murals/8x8/lifestyle/~artwork/s6-0062/a/25919158_4350172/~~/the-good-times-vol-1-no-1--newspaper-with-only-good-news-wall-murals.jpg',
          topic:
            'การฝึกอบรมนักข่าวชุมชนรุ่นใหม่',
        },
      ],
      activity: [
        {
          image:
            'https://cdn.corporatefinanceinstitute.com/assets/time-management.jpg',
          topic:
            'การบริหารเวลาอย่างมีประสิทธิภาพ',
        },
      ]
    }

    return data[type][i]
  })
}