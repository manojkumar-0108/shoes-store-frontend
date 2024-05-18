
import './AppDownload.css';
import { assets } from '../../assets';

const { playStoreIcon, appStoreIcon } = assets.images;

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>For Better Experience Download <br />inshop App</p>
            <div className="app-download-platforms">
                <img src={playStoreIcon} alt="" />
                <img src={appStoreIcon} alt="" />
            </div>
        </div>
    )
}

export default AppDownload
