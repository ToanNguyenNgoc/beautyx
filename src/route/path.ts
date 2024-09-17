
export const path = {
  home: '/trang-chu',
  auth: (ref?: 'login' | 'register' | 'forgot') => !ref ? '/auth' : `/auth?ref=${ref}`
}