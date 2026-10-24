import PageBase from "../@/layout/PageBase/PageBase";
import ProfileForm from "./ProfileForm";
import ProfilePhoto from "./ProfilePhoto";

export default function Profile() {
  return (
    <PageBase title="Meu Perfil">
      <div className="min-vh-100 min-vw-100 d-flex py-4 justify-content-center bg-primary">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">

              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <ProfilePhoto />
                </div>

                <div className="col-12 col-md-8">
                  <ProfileForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBase>
  );
}
