import { useEffect, useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { VIEW_WORKSPACES } from "../../graphql/queries/viewWorkspaces";
import { CREATE_WORKSPACE } from "../../graphql/mutations/createWorkspace";

import Modal from "../../components/Modal/Modal.component";
import CreateWorkspaceForm from "../../components/CreateWorkspaceForm/CreateWorkspaceForm.component";

export default function Workspaces() {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  // Graphql
  const { loading, error, data } = useQuery(VIEW_WORKSPACES);
  const [createWorkspaceMutation, createWorkspace] = useMutation(
    CREATE_WORKSPACE,
    {
      refetchQueries: [VIEW_WORKSPACES],
      onCompleted: () => {
        setIsCreatingWorkspace(false);
      },
      onError: (error) => console.log(error),
    }
  );

  function onSubmitCreateWorkspaceForm(workspaceData) {
    createWorkspaceMutation({
      variables: {
        // ...workspaceData,
      },
    });
  }

  if (loading) {
    return <p>Loading workspaces...</p>;
  }

  if (error) {
    return <p>There was an error loading your workspaces.</p>;
  }

  return (
    <div>
      <button onClick={() => setIsCreatingWorkspace(!isCreatingWorkspace)}>
        Create Workspace
      </button>
      {data?.workspaces && (
        <div>
          <p>Number of workspaces: {data?.workspaces?.length}</p>
          <div>
            {data?.workspaces?.map((space) => (
              <p key={space.id}>Name: {space.name}</p>
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Create Workspace"
        show={isCreatingWorkspace}
        onClose={() => setIsCreatingWorkspace(false)}
      >
        <CreateWorkspaceForm
          onSubmit={onSubmitCreateWorkspaceForm}
          onCancel={() => setIsCreatingWorkspace(false)}
          formLoading={createWorkspace.loading}
          formError={createWorkspace.error}
        />
      </Modal>
    </div>
  );
}
