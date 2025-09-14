import { MessageCircleDashed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PlayGroundHeader = () => {
  return (
    <div className="w-full flex ">
      <div>
        <Select value="english">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="greek">Greek</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <MessageCircleDashed />
      </div>
    </div>
  );
};

export default PlayGroundHeader;
