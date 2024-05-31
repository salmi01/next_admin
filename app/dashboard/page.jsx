import Card from "../ui/dashboard/card/card"
import Chart from "../ui/dashboard/chart/chart"
import styles from "../ui/dashboard/dashboard.module.css"
import RightBar from "../ui/dashboard/rightbar/rightbar"
import Transation from "../ui/dashboard/transaction/transaction"

const DashboardPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                    <Card />

                </div>
                <Transation />
                <Chart />

            </div>

            <div className={styles.side}>
                <RightBar />
            </div>
        </div>
    )
}

export default DashboardPage