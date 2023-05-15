import { JsxElement } from "typescript";
import { useAppDispatch } from "../../../store";
import styles from "../Sidebar.module.scss";
import { IconType } from "react-icons/lib";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
export const SingleLi = ({ Icon, text, options }: { Icon: IconType; text: string, options: Array<{ name: string, link: string }> }) => {
    const asyncDispatch = useAppDispatch();
    const [close, setClose] = useState(true);
    return (
        <div className={styles["sidebar__single-el"]} onClick={() => { return options.length > 0 ? (setClose((prev) => !prev)) : 0 }}>
            <div className={styles["sidebar__single-el-title"]}>
                <div>
                    <Icon /> {text}
                </div>
                {options.length > 0 && 

                    <button style={{ transition: ".1s", transform: close ? "rotate(0deg)" : "rotate(-180deg)" }}>

                        <IoIosArrowDown />
                    </button>
                }
            </div>
            {close || <ul className={`${styles["sidebar__single-el-body"]}`}>
                {options.map(opt => <li> <Link to={`${opt.link}`}>{opt.name}</Link> </li>)}

            </ul>}
        </div>
    );
};
