import { useAppDispatch } from "../../store"
import styles from "./Sidebar.module.scss"
import { AiFillHome, AiOutlineMenu, AiFillPieChart, AiFillMail } from "react-icons/ai"
import { SingleLi } from "./SingleListElement/SingleLi"
import {FaUser, FaChalkboardTeacher, FaCalendarAlt} from "react-icons/fa"
export const Sidebar = () => {
    const asyncDispatch = useAppDispatch()
    return (
        <div className={styles["sidebar__wrap"]}>
            <div className={styles["sidebar__header"]}>
                <div className={styles["sidebar__logo"]}>
                    <AiOutlineMenu /> <div className={styles["sidebar__pill"]}>
                        MENU
                    </div>
                </div>
                <SingleLi Icon={AiFillHome} text="Dashboard" options={[]} />
            </div>
            <div className={styles["sidebar__divider"]}>
                <span>Gestione</span>
            </div>
            <div className={styles["sidebar__main"]}>
                <SingleLi Icon={FaUser} text="Iscritti" options={[{link: "/", name: "Option 1"}, {link: "/", name: "Option 2"}, {link: "/", name: "Option 3"}]} />
                <SingleLi Icon={FaChalkboardTeacher} text="Istruttori" options={[{link: "/", name: "Option 1"}, {link: "/", name: "Option 2"}, {link: "/", name: "Option 3"}]} />
                <SingleLi Icon={AiFillPieChart} text="Contabilita'" options={[{link: "/", name: "Option 1"}, {link: "/", name: "Option 2"}, {link: "/", name: "Option 3"}]} />
                <SingleLi Icon={FaCalendarAlt} text="Eventi" options={[{link: "/", name: "Option 1"}, {link: "/", name: "Option 2"}, {link: "/", name: "Option 3"}]}  />
                <SingleLi Icon={AiFillMail} text="Posta" options={[{link: "/", name: "Option 1"}, {link: "/", name: "Option 2"}, {link: "/", name: "Option 3"}]} />
            </div>
        </div>
    )

}