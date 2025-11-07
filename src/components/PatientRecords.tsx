import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

type PatientRecord = {
  id: string;
  fullname?: string;
  email?: string;
  patient_id?: string;
  result?: string;
  confidence?: number;
  imageUrl?: string;
  modality?: string;
  sequence?: string;
  createdAt?: Timestamp | null;
};

const RESULT_FILTERS = [
  { label: "All Results", value: "" },
  { label: "Glioma Tumor", value: "Glioma Tumor" },
  { label: "Meningioma Tumor", value: "Meningioma Tumor" },
  { label: "No Tumor", value: "No Tumor" },
  { label: "Pituitary Tumor", value: "Pituitary Tumor" },
];

const MODALITY_FILTERS = [
  { label: "All Modalities", value: "" },
  { label: "MRI", value: "MRI" },
  { label: "CT", value: "CT" },
  { label: "PET-CT", value: "PET-CT" },
];

const PatientRecords: React.FC = () => {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<string>("");
  const [selectedModality, setSelectedModality] = useState<string>("");

  useEffect(() => {
    if (!currentUser) {
      setRecords([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "testRecords"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: PatientRecord[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PatientRecord, "id">),
        }));
        setRecords(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch patient records:", err);
        setError("Unable to load patient records. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const filteredRecords = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesResult = selectedResult
        ? record.result === selectedResult
        : true;

      const matchesModality = selectedModality
        ? record.modality === selectedModality
        : true;

      const matchesSearch = term
        ? [record.fullname, record.email, record.patient_id]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(term))
        : true;

      return matchesResult && matchesModality && matchesSearch;
    });
  }, [records, searchTerm, selectedResult, selectedModality]);

  const formatTimestamp = (timestamp?: Timestamp | null) => {
    if (!timestamp) return "Pending";
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Records</h1>
          <p className="text-gray-500">
            Review your submitted patient cases, filter by diagnosis, and search by name or ID.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search by patient name, email, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input sm:w-72"
          />
          <select
            className="input"
            value={selectedResult}
            onChange={(e) => setSelectedResult(e.target.value)}
          >
            {RESULT_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
          >
            {MODALITY_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="inline-flex items-center gap-3 text-gray-500">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading patient records…</span>
          </div>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500">
          <i className="fas fa-folder-open text-4xl mb-3 text-gray-400"></i>
          <p className="font-semibold">No patient records found</p>
          <p className="text-sm">Try adjusting your filters or add a new patient record from the Test Form.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Imaging</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{record.fullname || "—"}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {record.patient_id && (
                        <span className="inline-flex items-center gap-1">
                          <i className="fas fa-id-card"></i>
                          {record.patient_id}
                        </span>
                      )}
                      {record.email && (
                        <span className="inline-flex items-center gap-1">
                          <i className="fas fa-envelope"></i>
                          {record.email}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        typeof record.confidence === "number" && record.confidence >= 90
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <i
                        className={
                          typeof record.confidence === "number" && record.confidence >= 90
                            ? "fas fa-exclamation-triangle"
                            : "fas fa-check-circle"
                        }
                      ></i>
                      {typeof record.confidence === "number" && record.confidence >= 90
                        ? "Tumor suspected"
                        : "No tumor"}
                      {typeof record.confidence === "number" && (
                        <span className="font-normal">
                          &nbsp;({record.confidence.toFixed(0)}% confidence)
                        </span>
                      )}
                    </div>
                    {record.result && (
                      <div className="mt-1 text-sm text-gray-500">
                        Model prediction: {record.result}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-800">{record.modality || "—"}</div>
                    <div>{record.sequence || "—"}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {typeof record.confidence === "number"
                      ? `${record.confidence.toFixed(2)}%`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatTimestamp(record.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.imageUrl ? (
                      <a
                        href={record.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        View Image
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;

