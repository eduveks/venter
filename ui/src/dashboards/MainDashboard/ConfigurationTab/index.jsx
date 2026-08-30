import {Divider} from "antd";
import PIXImageUploader from "./PIXImageUploader/index.jsx";
import EmailTemplates from "./EmailTemplates/index.jsx";

function Configuration({}) {
  return (
    <div>
      <PIXImageUploader />
      <Divider />
      <EmailTemplates />
    </div>
  );
}

export default Configuration;
