import Swal from "sweetalert2";

/**
 * 1. 가벼운 알림 토스트 (화면 하단 스르륵)
 * 사용법: showToast('가입 완료!', 'success')
 */
export const showToast = (message: string, icon: "success" | "error" | "warning" | "info" = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: "!rounded-2xl !mb-6 shadow-xl", // Tailwind 클래스 강제 적용(!)
    },
  });

  return Toast.fire({
    icon: icon,
    title: message,
  });
};

/**
 * 2. 예/아니요 선택 모달 (화면 중앙 팝업)
 * 사용법: const isOk = await showConfirm('삭제하시겠습니까?', '복구 불가합니다.')
 */
export const showConfirm = async (title: string, text: string = "") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#18181b", // 사진모아 메인 컬러 (zinc-950)
    cancelButtonColor: "#e4e4e7", // 취소 버튼 컬러 (zinc-200)
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    customClass: {
      popup: "!rounded-3xl", // 모달창 둥글게
      confirmButton: "!rounded-xl",
      cancelButton: "!rounded-xl",
    },
  });

  return result.isConfirmed; // 사용자가 '확인'을 누르면 true, '취소'를 누르면 false 반환
};

/**
 * 3. 단순 에러/정보 안내 모달 (확인 버튼만 있음)
 * 사용법: showAlert('오류 발생', '비밀번호를 확인해주세요.', 'error')
 */
export const showAlert = (
  title: string,
  text: string = "",
  icon: "success" | "error" | "warning" | "info" = "info",
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: "#18181b",
    confirmButtonText: "확인",
    customClass: {
      popup: "!rounded-3xl",
      confirmButton: "!rounded-xl",
    },
  });
};
