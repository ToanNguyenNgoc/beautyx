import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "config";
import styles from "./list-reflect.module.css";
import icon from "constants/icon";
import API_3RD from "api/3rd-api";
import { useTranslation } from "react-i18next";

interface OrgSocialItem {
    _id: string;
    org_social_name: string;
    org_social_number: string;
    org_social_email: string;
    org_social_content: string;
    org_social_files: string;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    data: {
        context: {
            data: OrgSocialItem[];
            total_page: number;
            total: number;
            current_page: number;
        };
    };
}

function ListReflect() {
    const [page, setPage] = useState(1);
    const { t } = useTranslation();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["feedback-org-socials", page],
        queryFn: async () => {
            const res = await axiosClient.get<ApiResponse>(
                `${API_3RD.API_NODE}/feedback-org-socials?page=${page}&limit=15`
            );
            return res.data.data.context;
        },
        keepPreviousData: true,
    });

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (data && page < data.total_page) setPage((prev) => prev + 1);
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>{t("reception.headerTitle")}</h1>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{t("reception.theadCreatedDate")}</th>
                            <th>{t("reception.theadOrgName")}</th>
                            <th>{t("reception.theadOrgNumber")}</th>
                            <th>{t("reception.theadContent")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>
                                    {t("reception.loadingData")}
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan={4}>
                                    {t("reception.errorLoadingData")}
                                </td>
                            </tr>
                        ) : data?.data.length > 0 ? (
                            data.data.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td>{item.org_social_name}</td>
                                    <td>{item.org_social_number}</td>
                                    <td>{item.org_social_content}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>{t("reception.noData")}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Buttons */}
            {data && data.total_page > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={styles.paginationButton}
                    >
                        <img src={icon.arrownLeftWhite} alt="" />
                    </button>
                    <p className={styles.pageInfo}>
                        {t("reception.paginationPage")} {page} /{" "}
                        {data.total_page}
                    </p>
                    <button
                        onClick={handleNextPage}
                        disabled={page === data.total_page}
                        className={styles.paginationButton}
                    >
                        <img src={icon.arrownRightWhite} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ListReflect;
