const IMAGE_LIST = [
  // 小图
  // 'https://img.alicdn.com/imgextra/i4/48386384/O1CN01AbbB0s1x1vLZ7KEkV_!!2-saturn_solar.png_480x480.jpg',
  // 'https://img.alicdn.com/imgextra/i3/116980150/O1CN01pNfdbt1CykJgPPF4Y_!!0-saturn_solar.jpg_480x480.jpg',
  // 'https://img.alicdn.com/img/bao/uploaded/i4/i4/33840063/O1CN01NUYHpR1CKttUz6Lq3_!!0-item_pic.jpg_360x360q90.jpg',
  // 'https://img.alicdn.com/img/bao/uploaded/i4/i2/1903596883/O1CN01jdfBqA20iSwITyAp6_!!0-item_pic.jpg_360x360q90.jpg',
  // 大图
  'https://img.alicdn.com/imgextra/i4/48386384/O1CN01AbbB0s1x1vLZ7KEkV_!!2-saturn_solar.png',
  'https://img.alicdn.com/imgextra/i3/116980150/O1CN01pNfdbt1CykJgPPF4Y_!!0-saturn_solar.jpg',
  'https://img.alicdn.com/img/bao/uploaded/i4/i4/33840063/O1CN01NUYHpR1CKttUz6Lq3_!!0-item_pic.jpg',
  'https://img.alicdn.com/bao/uploaded/i3/128940143/O1CN01g1yQbY1CvXZYGCd6T_!!128940143.jpg',
  'https://img.alicdn.com/img/bao/uploaded/i4/i2/1903596883/O1CN01jdfBqA20iSwITyAp6_!!0-item_pic.jpg',
  'https://img.alicdn.com/imgextra/i2/128940143/O1CN01f0u2At1CvXUrX5ZIU_!!128940143.jpg',
  'https://img.alicdn.com/imgextra/i2/4033308588/O1CN01Mw7aaB2DJMMmDW2On_!!4033308588.jpg',
  'https://img.alicdn.com/imgextra/i1/4033308588/O1CN01OsfP4o2DJMMi4KBEd_!!4033308588.jpg',
  'https://img.alicdn.com/imgextra/i1/4033308588/O1CN010oVPuy2DJMMn2dSLK_!!4033308588.jpg',
  'https://img.alicdn.com/imgextra/i3/4033308588/O1CN01zU20Qy2DJMMi4LWNS_!!4033308588.jpg',
  'https://img.alicdn.com/imgextra/i2/2499702373/O1CN01hhxS8J1TOsmED9N1y_!!2499702373.jpg',
  'https://img.alicdn.com/imgextra/i4/2499702373/O1CN01p0oL871TOsm4FEpnD_!!2499702373.jpg',
  'https://img.alicdn.com/imgextra/i3/2499702373/O1CN01KT4b4Z1TOsmAQIAPv_!!2499702373.jpg'
];

export default function getGirlImageUrl(): string {
  return IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)] || 'https://img.alicdn.com/bao/uploaded/i3/128940143/O1CN01g1yQbY1CvXZYGCd6T_!!128940143.jpg';
}