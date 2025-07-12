export default function AnswerCard({ data }) {
    return (
      <div className="card my-3">
        <div className="card-body">
          <div dangerouslySetInnerHTML={{ __html: data.text }} />
          <p className="text-muted mt-2">— {data.author}</p>
        </div>
      </div>
    );
  }