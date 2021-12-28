import useQrCode from "react-qrcode-hook";
 
function QrCodeHook() {

   
  const Optionen = {   
    margin: 5,
    scale: 10,
    color: {
      dark: '#ffffff',
      light: '#000099',
    } ,
  } ;
  const qrCode = useQrCode ( ' https://eli.de ' ,  Optionen ) ;   
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img alt="qr code" src={qrCode} />
    </div>
  );
}
export default QrCodeHook;


