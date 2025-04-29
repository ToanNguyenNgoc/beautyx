import icon from "constants/icon";
import styles from "./reception.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRecaptcha,MediaThirdParty, usePostMediaThirdParty } from "hooks";
import { useState } from "react";
import * as Yup from "yup";
import { AlertAppSnack, XButton } from "components/Layout";
import API_3RD from "api/3rd-api";
import {
    GoogleReCaptcha,
    GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import axios from "axios";
interface FeedbackFormValues {
    organizationName: string;
    decisionNumber: string;
    email: string;
    content: string;
    files: MediaThirdParty[];
}

const initialValues: FeedbackFormValues = {
    organizationName: "",
    decisionNumber: "",
    email: "",
    content: "",
    files: [],
};

export interface FeedbackOrgSocialInput {
    org_social_name: string;
    org_social_number: string;
    org_social_email: string;
    org_social_content: string;
    org_social_files: string[];
    recaptcha: string;
}

export const receptionApi = {
    create: (data: FeedbackOrgSocialInput) => {
        return axios.post(
            `${API_3RD.API_NODE}/feedback-org-socials`,
            data,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    },
};

export function useFeedbackOrgSocial() {
    return useMutation({
        mutationFn: (data: FeedbackOrgSocialInput) => receptionApi.create(data),
    });
}

function Reception() {
    const { handlePostMedia, isLoading } = usePostMediaThirdParty();
    const [previewImages, setPreviewImages] = useState<MediaThirdParty[]>([]);
    const { mutate } = useFeedbackOrgSocial();
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        organizationName: Yup.string().required(
            t("receptionList.validateOrganizationNameRequired")
        ),
        decisionNumber: Yup.string().required(
            t("receptionList.validateDecisionNumberRequired")
        ),
        email: Yup.string()
            .email(t("receptionList.validateEmailFormat"))
            .required(t("receptionList.validateEmailRequired")),
        content: Yup.string().required(
            t("receptionList.validateContentRequired")
        ),
        files: Yup.array()
            .min(1, t("receptionList.validateFilesMin"))
            .required(t("receptionList.validateFilesRequired")),
    });

    const {
        recaptcha_key,
        recaptcha,
        refreshReCaptcha,
        onRefreshRecaptcha,
        verifyRecaptchaCallback,
    } = useRecaptcha();
    const handleSubmit = async (
        values: FeedbackFormValues,
        { resetForm }: FormikHelpers<FeedbackFormValues>
    ) => {
        onRefreshRecaptcha();

        if (!recaptcha) {
            AlertAppSnack.open({
                title: t("receptionList.validateRecaptchaWarning"),
                type: "warning",
            });
            return;
        }

        const customData = {
            org_social_name: values.organizationName,
            org_social_number: values.decisionNumber,
            org_social_email: values.email,
            org_social_content: values.content,
            org_social_files: values.files.map((file) => file.original_url),
            recaptcha: recaptcha || "",
        };

        mutate(customData, {
            onSuccess: () => {
                AlertAppSnack.open({
                    title: t("receptionList.submitSuccess"),
                    type: "success",
                });
                resetForm();
                setPreviewImages([]);
                onRefreshRecaptcha();
            },
            onError: (error) => {
                AlertAppSnack.open({
                    title: t("receptionList.submitError"),
                    type: "error",
                });
                console.error("Submit error:", error);
                onRefreshRecaptcha();
            },
        });
    };

    const handleFilesChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: any,
        currentMedias: MediaThirdParty[]
    ) => {
        handlePostMedia({
            e: event,
            callBack: (newMedias) => {
                const updatedMedias = [...currentMedias, ...newMedias];
                setFieldValue("files", updatedMedias);
                setPreviewImages(updatedMedias);
            },
        });
    };

    const removeImage = (
        index: number,
        setFieldValue: any,
        currentMedias: MediaThirdParty[]
    ) => {
        const updatedMedias = [...currentMedias];
        updatedMedias.splice(index, 1);
        setFieldValue("files", updatedMedias);
        setPreviewImages(updatedMedias);
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{t("receptionList.pageTitle")}</h2>

            <div className={styles.container}>
                {/* Company Info */}
                <div className={styles.info}>
                    <h4>{t("receptionList.companyName")}</h4>
                    <p className={styles.infoText}>
                        <strong>{t("receptionList.taxCode")}:</strong>
                        <p>0110721653</p>
                    </p>

                    <p className={styles.infoText}>
                        <strong>📍 {t("receptionList.address")}:</strong>
                        <p>{t("receptionList.addressDetail")}</p>
                    </p>

                    <p className={styles.infoText}>
                        <strong>📞 {t("receptionList.phone")}:</strong>
                        <p>{t("receptionList.phoneNumber")}</p>
                    </p>

                    <p className={styles.infoText}>
                        <strong>📧 {t("receptionList.email")}:</strong>
                        <p>{t("receptionList.emailAddress")}</p>
                    </p>
                </div>
                <GoogleReCaptchaProvider
                    reCaptchaKey={recaptcha_key}
                    scriptProps={{
                        async: true,
                        defer: true,
                        appendTo: "head",
                        nonce: undefined,
                    }}
                >
                    {/* Feedback Form */}
                    <Formik<FeedbackFormValues>
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form className={styles.form}>
                                {/* Input fields */}
                                <div className={styles.formGroup}>
                                    <label
                                        htmlFor="organizationName"
                                        className={styles.label}
                                    >
                                        {t(
                                            "receptionList.fieldOrganizationName"
                                        )}
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    </label>
                                    <Field
                                        id="organizationName"
                                        name="organizationName"
                                        type="text"
                                        placeholder={t(
                                            "receptionList.placeholderOrganizationName"
                                        )}
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name="organizationName"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label
                                        htmlFor="decisionNumber"
                                        className={styles.label}
                                    >
                                        {t("receptionList.fieldDecisionNumber")}
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    </label>
                                    <Field
                                        id="decisionNumber"
                                        name="decisionNumber"
                                        type="text"
                                        placeholder={t(
                                            "receptionList.placeholderDecisionNumber"
                                        )}
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name="decisionNumber"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label
                                        htmlFor="email"
                                        className={styles.label}
                                    >
                                        {t("receptionList.fieldEmail")}
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={t(
                                            "receptionList.placeholderEmail"
                                        )}
                                        className={styles.input}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label
                                        htmlFor="content"
                                        className={styles.label}
                                    >
                                        {t("receptionList.fieldContent")}
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    </label>
                                    <Field
                                        id="content"
                                        name="content"
                                        as="textarea"
                                        placeholder={t(
                                            "receptionList.placeholderContent"
                                        )}
                                        rows={5}
                                        className={styles.textarea}
                                    />
                                    <ErrorMessage
                                        name="content"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                {/* Upload images */}
                                <div className={styles.formGroup}>
                                    <label
                                        htmlFor="files"
                                        className={styles.label}
                                    >
                                        {t("receptionList.fieldAttachImages")}
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    </label>
                                    <div className={styles.uploadBox}>
                                        <input
                                            id="files"
                                            name="files"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) =>
                                                handleFilesChange(
                                                    event,
                                                    setFieldValue,
                                                    values.files
                                                )
                                            }
                                            className={styles.uploadInput}
                                        />
                                        <span className={styles.uploadText}>
                                            <img
                                                src={icon.addImg}
                                                alt={t(
                                                    "receptionList.uploadPlaceholder"
                                                )}
                                                className={styles.uploadIcon}
                                            />
                                        </span>
                                    </div>
                                    <ErrorMessage
                                        name="files"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                {/* Preview multiple images */}
                                {previewImages.length > 0 && (
                                    <>
                                        <div className={styles.previewList}>
                                            {previewImages.map(
                                                (media, index) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.previewContainer
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                media.original_url
                                                            }
                                                            alt={`preview-${index}`}
                                                            className={
                                                                styles.previewImage
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.removeButton
                                                            }
                                                            disabled={isLoading}
                                                            onClick={() =>
                                                                removeImage(
                                                                    index,
                                                                    setFieldValue,
                                                                    values.files
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    icon.xCircleRed
                                                                }
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}

                                <XButton
                                    type="submit"
                                    className={styles.submitButton}
                                    loading={isLoading}
                                    title={t("receptionList.submitButton")}
                                />
                            </Form>
                        )}
                    </Formik>
                    <GoogleReCaptcha
                        refreshReCaptcha={refreshReCaptcha}
                        onVerify={verifyRecaptchaCallback}
                    />
                </GoogleReCaptchaProvider>
            </div>
        </div>
    );
}
export default Reception;
