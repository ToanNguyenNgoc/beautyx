import { CSSProperties, DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import style from './xinput.module.css'

interface XInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  styleContainer?: CSSProperties,
  classNameContainer?: string
  inputHeight?: number;
  icon?: string;
  iconSize?: number;
  textError?: string;
  componentRight?: JSX.Element;
  onClickRight?: () => void;
  mode?: 'flat' | 'outlined'
}

export const XInput = forwardRef<HTMLInputElement, XInputProps>((props, ref) => {
  const {
    styleContainer = {},
    classNameContainer = '',
    inputHeight = 44,
    icon,
    iconSize = 22,
    textError,
    componentRight,
    onClickRight = () => { },
    mode = 'flat',
    ...res
  } = props
  const generateClassInput = ()=>{
    let classNameInput = style.input_box
    if(mode === 'outlined'){
      classNameInput = style.input_box_outlined
    }
    return classNameInput
  }
  return (
    <div
      className={`${style.input_cnt} ${classNameContainer}`}
      style={Object.assign({ height: inputHeight + 22 }, styleContainer)}
    >
      <div
        className={generateClassInput()}
        style={{ height: inputHeight, borderRadius: inputHeight / 2 }}
      >
        {
          icon ?
            <div className={style.input_icon}>
              <img src={icon} alt="" style={{ width: iconSize, height: iconSize }} />
            </div>
            :
            null
        }
        <input
          className={style.input_text}
          ref={ref}
          {...res}
          style={Object.assign({
            borderRadius: inputHeight / 2,
            paddingLeft: icon ? inputHeight : 16,
            paddingRight: componentRight ? inputHeight : 16,
            fontSize: inputHeight * 0.33
          }, props.style)}
        />
        {
          componentRight ?
            <div className={style.input_right} onClick={onClickRight}>
              {componentRight}
            </div>
            :
            null
        }
      </div>
      <span className={style.input_text_error}>
        {textError}
      </span>
    </div>
  );
});
