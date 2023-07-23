import PopupWrap from './PopupWrap'

export type SharePopupProps = {
    show: boolean
    setShow: (show: boolean) => void
}

function SharePopup({ show, setShow }: SharePopupProps) {
    // const [show, setShow] = useState(true)
    return (
        <PopupWrap show={show} callBack={(bool) => {
            setShow(bool)
        }}>
            <div className=' bg-white w-full max-w-[450px] p-10 rounded-lg'>
                Share feature coming soon
            </div>
        </PopupWrap>
  )
}

export default SharePopup