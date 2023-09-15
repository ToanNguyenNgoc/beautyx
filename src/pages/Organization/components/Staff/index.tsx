import React from 'react'
import style from "./style.module.css"
import { Container } from '@mui/material'

export function Staff() {
  return (
    <Container>
      <div className={style.container}>
        <div className={style.title}>Nhân viên</div>
      </div>
    </Container>
  );
}
