import PopupWrap from './PopupWrap'
import { SharePopupProps } from './SharePopup'

type SearchPopupProps = {} & SharePopupProps

function SearchPopup({ show, setShow }: SearchPopupProps) {
    // const [show, setShow] = useState(true)
    return (
        <PopupWrap show={show} callBack={(bool) => {
            setShow(bool)
        }}>
            <div className=' bg-white w-full max-w-[450px] p-10 rounded-lg'>
                Search feature coming soon
            </div>
        </PopupWrap>
  )
}

export default SearchPopup