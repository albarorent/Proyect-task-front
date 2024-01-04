import Swal from "sweetalert2";

export function Alert(id) {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  if(id){
    Toast.fire({
        icon: "success",
        title: "Successfully updated",
      });
  }else{
    Toast.fire({
        icon: "success",
        title: "Successfully registered",
      });
  }
 
}

export function deleteAlert()
{

}

