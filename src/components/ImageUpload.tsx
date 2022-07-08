export const ImageUpload = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <form>
      <input type="file" accept="image/*" multiple onChange={onChange} />
    </form>
  );
};
